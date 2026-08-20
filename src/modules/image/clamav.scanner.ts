import net from "node:net";
import { env } from "../../config/env.js";
import AvScannerError from "../../errors/AvScannerError.js";

interface ScanResult {
    clean: boolean;
    reason?: string;
}

const CLAMAV_HOST = env.clamAvHost;
const CLAMAV_PORT = env.clamAvPort;

const CONNECTION_TIMEOUT = 10_000;
const CHUNK_SIZE = 64 * 1024;

const scanBuffer = (buffer: Buffer): Promise<ScanResult> => {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket();

        let response = "";

        const cleanup = () => {
            socket.removeAllListeners();
            socket.destroy();
        };

        socket.setTimeout(CONNECTION_TIMEOUT);

        socket.on("timeout", () => {
            cleanup();
            reject(new AvScannerError("ClamAV connection timed out.", "Please ensure the ClamAV service is running and accessible."));
        });

        socket.on("error", (error) => {
            cleanup();
            reject(
                new AvScannerError(`ClamAV connection failed: ${error.message}`, "Check ClamAV network settings or if the service is down."),
            );
        });

        socket.on("data", (data) => {
            response += data.toString();
        });

        socket.on("end", () => {
            const result = response.replace(/\0/g, "").trim();

            cleanup();

            if (result.endsWith("FOUND")) {
                resolve({
                    clean: false,
                    reason: result,
                });
                return;
            }

            if (result.endsWith("OK")) {
                resolve({
                    clean: true,
                });
                return;
            }

            reject(
                new AvScannerError(
                    `Unexpected response from ClamAV: ${result}`,
                    "ClamAV returned an unrecognized response format."
                ),
            );
        });

        socket.connect(CLAMAV_PORT, CLAMAV_HOST, () => {
            socket.write(Buffer.from("zINSTREAM\0"));

            let offset = 0;

            while (offset < buffer.length) {
                const chunk = buffer.subarray(
                    offset,
                    offset + CHUNK_SIZE,
                );

                const size = Buffer.alloc(4);
                size.writeUInt32BE(chunk.length, 0);

                socket.write(size);
                socket.write(chunk);

                offset += chunk.length;
            }

            // Zero-length chunk marks the end of the stream.
            const end = Buffer.alloc(4);
            end.writeUInt32BE(0, 0);

            socket.write(end);
        });
    });
};

export const antivirusScanner = {
    scan: scanBuffer,
};