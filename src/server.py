from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse as urlparse

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse.urlparse(self.path)
        query = urlparse.parse_qs(parsed_path.query)
        code = query.get('code', None)
        if code:
            self.send_response(200)
            self.end_headers()
            self.wfile.write(f"Authorization code: {code[0]}".encode())
            print(f"Authorization code: {code[0]}")
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Authorization code not found")

if __name__ == "__main__":
    server = HTTPServer(('localhost', 8888), MyHandler)
    print("Server started at http://localhost:8888")
    server.serve_forever()
