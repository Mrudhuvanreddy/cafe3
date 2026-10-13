from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os

class CafeServer(SimpleHTTPRequestHandler):

    def end_headers(self):
        # Enable CORS for AJAX / Fetch requests
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == "/submit":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)

            try:
                received_data = json.loads(post_data.decode("utf-8"))
                print("\n==========================================")
                print("☕ [THE WAVE CAFE] New Order Received via POST:")
                print(json.dumps(received_data, indent=2))
                print("==========================================\n")

                response = {
                    "status": "success",
                    "message": "Order received successfully at THE WAVE Cafe!",
                    "data": received_data
                }
            except Exception as e:
                response = {
                    "status": "error",
                    "message": f"Failed to parse JSON: {str(e)}"
                }

            response_bytes = json.dumps(response).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(response_bytes)))
            self.end_headers()
            self.wfile.write(response_bytes)
        else:
            self.send_error(404, "Endpoint Not Found")

if __name__ == "__main__":
    PORT = 8000
    server_address = ("localhost", PORT)
    httpd = HTTPServer(server_address, CafeServer)
    print("=" * 50)
    print(f"🚀 THE WAVE Cafe Server running at http://localhost:{PORT}")
    print(f"📁 Serving static files and handling POST requests at /submit")
    print("=" * 50)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")