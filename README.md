# VoßFit Sandbox

Lokale Entwicklungsbasis für **Sandbox-Hauptseite** und **Sandbox-Lab**.

## Verbindliche Grenzen

- **Sandbox**: voßfit.de (xn--vofit-mqa.de) und lab.voßfit.de (lab.xn--vofit-mqa.de).
- **Projekt**: vossfit.de und lab.vossfit.de; diese Hosts sind ausdrücklich außerhalb dieses Repositories.
- Synchronisationsrichtung für Quellcode: **Spaceship Sandbox → lokaler Staging-/Review-Stand → privates GitHub-Repo**. Kein automatischer Rückweg von GitHub zum Hosting.
- Kein Deployment, keine DNS-Änderung und kein Schreiben auf Spaceship ohne separate, ausdrückliche Freigabe.
- Zugangsdaten, API-Schlüssel, OAuth-Client-Secrets und echte Nutzer-/Profildaten gehören nicht ins Repository.

## Struktur

- apps/homepage/: geprüfte Sandbox-Hauptseite und zugehörige Assets (Quellimport in Sicherheitsprüfung).
- apps/lab/: Lab-Oberfläche und spätere Server-/API-Schicht.
- docs/: Architektur, Provider, Synchronisierung, Quellinventar und Ausbauplan.
- scripts/scan-secrets.ps1: heuristischer Secret-Scanner; Trefferwerte werden nicht ausgegeben.

## Aktueller Status

- Lokales Git-Gerüst und Lab-UI-Prototyp vorhanden.
- Ein lokaler Homepage-HTML-Entwurf und Assets liegen im Arbeitsordner, sind aber **nicht freigegeben oder committet**: Scanner meldet API-Key-ähnliche/credentialartige Muster. Erst prüfen und Geheimnisse entfernen oder durch sichere Laufzeitkonfiguration ersetzen.
- Das bestehende origin zeigt noch auf nicovoss01/VossBot-Lab (öffentlich, leer). **Dorthin wird nicht gepusht.** Ziel ist ein neues privates Repo VoßFit-Sandbox; die GitHub-Verbindung muss auf dieses Repo umgestellt und verifiziert werden.
- Cloudflare-Verbindung ist lesend erreichbar. DNS-Zonen für Projekt und Sandbox existieren; DNS wurde nicht verändert. Der Sandbox-Lab-Datei-Worker ist deployed, und sein privater R2-Bucket wurde passend zum vorhandenen Binding angelegt. Ein CNAME in der Projektzone wirkt auf den Sandbox-Lab-Host gerichtet und muss fachlich verifiziert werden, bevor überhaupt eine Änderung erwogen wird.
- Gemini ist der vorgesehene Website-KI-Anbieter. API-Schlüssel bleiben serverseitig; Google Login und Gemini API sind getrennte Integrationen.
- Hosting-/FTP-/SFTP-Zugang und aktuelle, autorisierte Lab-Quellquelle sind noch nicht verifiziert.

## Arbeitsablauf

1. Live-Sandbox-Dateien nur lesend inventarisieren und sichern.
2. Import in einen separaten Staging-Ordner; Dateihashes und Quellpfad dokumentieren.
3. Secret-Scan und redigierte manuelle Prüfung; nichts mit echten Secrets committen.
4. Geprüfte Änderungen auf Feature-Branch, Review und Tests.
5. GitHub-Branch/PR ist **keine Live-Veröffentlichung**.
6. Ein späteres Deployment zur Sandbox braucht eine eigene Freigabe, Backup und Rollback-Plan.
