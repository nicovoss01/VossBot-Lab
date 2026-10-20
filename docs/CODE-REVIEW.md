# Quellcode-Review und konkrete Änderungen

Stand: 2026-10-20. Review erfolgte lokal und ohne Live-Dateien zu ändern.

## Homepage-Kandidat

Beobachtet:
- Einzelne große Hauptdatei mit rund 921 KB, 16 Script-Tags, einem Style-Block, 8 Formularen und eingebetteten/externen Medien.
- Enthält bestehende Bereiche für Training/Gym, Ernährung, Kohlenhydrate/Fett/Protein, Trainingspläne, Übungen, Verlauf und gespeicherte Profile.
- Der Code enthält eine OpenAI-Key-Eingabeoberfläche und einen direkten Verweis auf api.openai.com. Das passt nicht zur festgelegten Gemini-Runtime-Strategie und birgt das Risiko, dass ein privater API-Key im Browser gespeichert oder genutzt wird.
- Secret-Scan findet mehrere key-/credentialartige Muster. Werte wurden nicht ausgegeben; sie müssen vor dem Commit einzeln geprüft werden.

Empfohlene Änderungen:
1. Bestehende UX und Funktionen zunächst erhalten; nicht neu schreiben, bevor Regressionen dokumentiert sind.
2. Clientseitige OpenAI-Key-Eingabe, Speicherung und direkte Provider-Aufrufe entfernen bzw. migrieren. Browser ruft nur den vorgesehenen Sandbox-Gemini-Worker auf; dessen Auth, erlaubte Origins und Requestformat müssen vor der Umstellung abgeglichen werden.
3. Keine Provider- oder Hosting-Secrets in HTML, LocalStorage oder Git. Firebase Web-Konfiguration ist gesondert zu bewerten; sie ist nicht dasselbe wie ein Admin-Secret.
4. API-Fehler, Ladezustände, Timeout und Limits sichtbar behandeln.
5. Erst nach Quellvergleich Assets/Pfade ordnen. Für schnelle Iterationen bleibt index.html der Einstieg; keine unnötige Komplettaufteilung in viele Dateien.

## Lab-Prototyp

Beobachtet:
- Eigenständige responsive UI mit Übersicht, Werkbank, KI-Agenten, Aufgaben, Dateien/Medien, Systeme, VoßBot und Projektgedächtnis.
- Derzeit Demo-/Lokalzustand: keine dauerhafte Speicherung, kein echter Datei-Upload, kein KI-Aufruf, keine Firebase-Anmeldung oder Release-Funktion.

Empfohlene Umsetzung:
1. Bestehende Live-Lab-Quelle autorisiert sichern und mit dem Prototyp vergleichen.
2. Erst dann Auth-Session und Serverberechtigungen anbinden.
3. Dateien über den Sandbox-Datei-Worker und den neu angelegten privaten R2-Bucket verwalten; erst authentifizierte End-to-End-Tests durchführen.
4. Gemini über den bestehenden Sandbox-API-Worker anbinden, nicht über direkte Browser-API-Calls.
5. Werkbank-Experimente als Entwürfe/versionierte Diffs speichern; nie ohne Freigabe live publizieren.
6. Projektgedächtnis, Aufgaben und Einstellungen persistent speichern, mit Zugriffsschutz und Lösch-/Exportmöglichkeit.
7. Medien-Upload: Größen-/Typprüfung, Dateinamen normalisieren, Zugriff pro Benutzer/Projekt, Rate-Limits und Audit-Log.

## Was ich vor einer Codeänderung noch abgleichen muss

- Exakte Auth-/API-Verträge der vorhandenen Sandbox-Worker mit den Frontend-Aufrufen.
- Welche Homepage-Datei und welches Lab-Verzeichnis auf Spaceship tatsächlich live sind.
- Firebase-Projekt und erlaubte Domains der Sandbox; Projekt-IDs/Secrets nicht übertragen.
- Ob der bestehende Lab-Worker Auth/Upload/Delete wie erwartet ausführt; derzeit ist nur Health (200) und anonymer Files-Zugriff (401) getestet.
