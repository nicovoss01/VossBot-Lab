# Ausbauplan: VoßFit Sandbox und Lab

## Leitbild

Die Hauptseite bleibt der bestehende Nutzer-Einstieg. Das Lab wird zur Werkstatt für Ideen, Komponenten, Agenten und Veröffentlichungsentwürfe. Möglichst viel Verhalten soll aus klar getrennten Modulen und Konfiguration kommen, nicht aus unübersichtlichen Änderungen an einer riesigen HTML-Datei. Für einen kleinen statischen Prototyp darf die Hauptdatei zunächst der Einstiegspunkt bleiben; produktive KI, Dateien und Konten benötigen jedoch sichere serverseitige Endpunkte.

## Priorität 0 — Sicherheit und Reproduzierbarkeit

- [ ] Privates GitHub-Repo erstellen und Remote prüfen; nicht zum öffentlichen VossBot-Lab pushen.
- [ ] Aktuellen Sandbox-Quellstand von Spaceship read-only exportieren, Hashes und Quellpfade dokumentieren.
- [ ] API-Keys/Secrets aus dem importierten HTML entfernen; echte Schlüssel bei möglicher Veröffentlichung rotieren.
- [ ] Sandbox-Lab-Quelle authentifiziert exportieren; HTTP-401-Schutz nicht umgehen.
- [ ] Homepage-Review: Legacy-OpenAI-Key-UI und direkte Provider-Aufrufe gegen den vorhandenen Gemini-Worker migrieren; erst nach API-Vertragsabgleich.
- [ ] CSS/JS/Assets inventarisieren, relative Pfade prüfen, große Assets deduplizieren.
- [ ] CI: Secret-Scan, HTML-/JS-Basisprüfungen und Build-Checks; keine Live-Deployments.
- [ ] README und Runbook: lokaler Start, Test, Backup, Rollback, Release-Freigabe.

## Priorität 1 — Architektur, damit Änderungen klein bleiben

- [ ] apps/homepage/index.html als stabiler Einstieg; später CSS und JS schrittweise in assets/css/ und assets/js/ auslagern.
- [ ] Zentrale config.js/config.json nur für öffentliche, nicht geheime Einstellungen: Brand, Feature-Flags, Pfade, UI-Version, erlaubte Module.
- [ ] Provider-Adapter für Gemini, Auth, Storage und Dateiverarbeitung getrennt halten.
- [ ] apps/lab/ als eigenständige Oberfläche mit gemeinsamen Design-Tokens, aber separater Daten-/Berechtigungsschicht.
- [ ] Komponenten-/Plugin-Registry, damit neue Werkbank-Bausteine registriert werden können, ohne die gesamte Hauptdatei umzubauen.
- [ ] Entwicklungs-, Sandbox- und Projekt-Konfigurationen streng trennen; keine Projekt-IDs/Domain-Allowlist ungeprüft übernehmen.

## Priorität 2 — Lab als visuelles Ideenlabor

- [ ] Werkbank: HTML/CSS/JS-Snippets, Text, Bilder, Icons, Frames, Vorschau und Versionen.
- [ ] Entwürfe speichern, vergleichen, zurücksetzen und als Änderungsvorschlag veröffentlichen.
- [ ] Status pro Experiment: Entwurf, lokal, geprüft, freigegeben, veröffentlicht; Unterschiede zu Live-Dateien anzeigen.
- [ ] Ein-/Ausschalter für Experimente, mit letzter Auswahl und klarer Synchronisationsanzeige.
- [ ] Komponentenbibliothek: Hero, Karten, Navigation, Modals, Formulare, Gym-/Cook-/GymCook-Bausteine.
- [ ] Medienverwaltung: Upload, Metadaten, Vorschau, Größenlimits, erlaubte Dateitypen, Lösch-/Versionierungskonzept.
- [ ] Aufgaben, Notizen, Projektgedächtnis und Änderungsprotokoll mit Suchfunktion.
- [ ] Mobile-first UI, Tastaturbedienung, gute Kontraste und kompakte VoßFit-Optik.

## Priorität 3 — VoßBot / KI-Agenten

- [ ] Agentenrollen (Planung, Code-Review, Design, Sicherheit, Content) mit getrennten Fähigkeiten und klaren Berechtigungen.
- [ ] Gemini ausschließlich über serverseitigen API-Proxy; Schlüssel nie in Browsercode.
- [ ] Kontextaufbau aus ausgewählten Dateien/Docs statt pauschalem Vollzugriff.
- [ ] Änderungen als Diff/PR-Vorschlag erzeugen, nicht stillschweigend live überschreiben.
- [ ] Dokumente/Bilder/Videos entgegennehmen, Typ/Größe validieren und Ergebnis/Quellenstatus sichtbar machen.
- [ ] Konversationen/Projektgedächtnis persistent speichern, mit Zugriffsschutz, Export und Löschkonzept.
- [ ] Quoten, Rate-Limits, Kosten-/Tokenanzeige, Fehlerzustände und Audit-Log.
- [ ] Google Login separat von App-Rollen/Server-Autorisierung behandeln.

## Priorität 4 — Infrastruktur und Daten

- [x] Sandbox-Lab-R2-Bucket passend zum vorhandenen Worker-Binding angelegt (WEUR, privat).
- [ ] R2-API-End-to-End prüfen; Auth, Upload-Policy, erlaubte Typen/Größen, Lifecycle und sichere Zugriffspfade festlegen.
- [ ] Für vertrauliche Inhalte private Buckets + kurzlebige signierte URLs; niemals öffentliche Bucket-Schlüssel im Frontend.
- [ ] Backend-Laufzeit festlegen: vorhandenes Spaceship-Hosting prüfen; alternativ Worker/Pages nur als separater, ausdrücklich freigegebener Pfad.
- [ ] Backups, Restore-Test, Observability, Fehlerprotokolle und Notfall-Rollback.
- [ ] DNS/SSL/Proxy pro Host dokumentieren und erst nach Soll/Ist-Abgleich verändern.

## Leitprinzip

Erst Quellen- und Zugangsstatus sichern, dann Architektur und Datenmodell festlegen, anschließend Module schrittweise implementieren. Keine neue Domain, kein Live-Write und kein Deployment ohne ausdrückliche Freigabe.
