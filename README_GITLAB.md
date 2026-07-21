# Publicación del cuaderno DEIDT en GitLab Pages

## Proyecto recomendado

`deidt-devsecops-cuaderno`

## Carga inicial desde la interfaz de GitLab

1. Crear un proyecto vacío e inicializarlo con README.
2. Abrir **Code > Repository**.
3. Seleccionar **+ > Upload file** y cargar los archivos del paquete conservando la estructura.
4. Confirmar que `.gitlab-ci.yml` quedó en la raíz y que la rama predeterminada se llama `main`.
5. Abrir **Build > Pipelines** y esperar que el trabajo `create-pages` termine correctamente.
6. Abrir **Deploy > Pages** para consultar la dirección HTTPS asignada.

## Dirección esperada en GitLab.com

Para un usuario `usuario` y proyecto `deidt-devsecops-cuaderno`:

`https://usuario.gitlab.io/deidt-devsecops-cuaderno/`

GitLab puede habilitar una dirección única diferente; la dirección definitiva aparece en **Deploy > Pages**.

## Alcance de esta versión

- Curso secuencial, glosario, evaluaciones y evidencias.
- Persistencia local en el navegador mediante `localStorage`.
- Exportación del expediente del participante.
- No incluye todavía autenticación institucional ni base de datos central.

## Seguridad

No publicar contraseñas, tokens, datos personales reales ni código sensible en el repositorio. Para una versión institucional se requiere SSO/OIDC, API, base de datos, controles de acceso, auditoría y almacenamiento protegido de evidencias.
