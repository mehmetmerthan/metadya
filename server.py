import http.server
import socketserver

PORT = 8080  # Yerel sunucu portu
# DIRECTORY = "/"  # Web sitesinin klasör yolunu buraya girin

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Sunucu başlatıldı. http://localhost:{}".format(PORT))
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass

httpd.server_close()
print("Sunucu kapatildi.")
