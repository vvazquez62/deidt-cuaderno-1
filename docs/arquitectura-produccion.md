# Evolución a registro institucional

## V01: prototipo estático

Navegador → HTML/CSS/JavaScript → almacenamiento local → exportación JSON/CSV.

Ventaja: permite validar contenidos, experiencia, evaluaciones y flujo sin infraestructura adicional.

Limitación: no existe registro central ni garantía de identidad.

## V02: servicio institucional

1. Persona inicia sesión mediante SSO/OIDC institucional.
2. Frontend obtiene roles y módulos autorizados.
3. API registra fuente revisada, evidencia, intento, respuestas, resultado y avance.
4. PostgreSQL conserva el expediente estructurado.
5. Almacenamiento de objetos conserva evidencias con hash, clasificación y retención.
6. Auditoría central envía eventos al SIEM.
7. Panel de instructor consulta avance por persona, mesa, área, proveedor y cohorte.
8. El contenido se versiona en Git y pasa por el mismo flujo DevSecOps que enseña.

## Roles mínimos

- Participante: cursa, carga evidencia y consulta sus resultados.
- Instructor: revisa evidencia y retroalimenta.
- Coordinador: administra cohortes y reportes.
- Administrador de contenido: versiona módulos y bancos de preguntas.
- Auditor: consulta expediente y trazabilidad sin modificar.

## Controles mínimos

- RBAC y mínimo privilegio.
- Cifrado en tránsito y reposo.
- Separación de datos personales y evidencias técnicas.
- Registro de cada intento y cambio de contenido.
- Política de retención, rectificación y eliminación.
- Respaldo, restauración y continuidad.
- Pruebas SAST, SCA, secretos, DAST y escaneo de imagen.
- SBOM y firma de artefactos.
- Observabilidad y alertas.
