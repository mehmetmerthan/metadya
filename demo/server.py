import http.server
import socketserver

PORT = 8000  # Kullanmak istediğiniz port numarasını burada belirtin

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Sunucu çalisiyor... Port:", PORT)
    httpd.serve_forever()
