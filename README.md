# Cuaderno interactivo DevSecOps · DEIDT

Prototipo web sin dependencias externas para nivelación en DevOps, DevSecOps, ITIL, TOGAF y OpenShift, articulado con las cuatro mesas funcionales de la DEIDT.

## Funciones incluidas

- Registro local del participante.
- Avance secuencial con módulos bloqueados.
- Glosario técnico con buscador.
- Fuentes oficiales obligatorias por módulo.
- Evidencias escritas y huella SHA-256 de archivos complementarios.
- Evaluaciones con umbral de 80%, retroalimentación e intentos.
- Diagrama de Gantt de seis semanas y equivalente textual accesible.
- Exportación individual JSON/CSV.
- Importación manual de expedientes y padrón local.
- Constancia demostrativa al concluir.
- Tipografía ampliada, alto contraste y navegación por teclado.

## Alcance de seguridad y datos

La versión V01 guarda información en `localStorage` del navegador. No existe autenticación central, sincronización ni almacenamiento institucional de archivos. El archivo de evidencia no se carga: sólo se registra su nombre, tamaño, tipo y huella SHA-256.

Para operación institucional se requiere una segunda iteración con:

1. SSO/OIDC institucional y RBAC.
2. API desplegada en OpenShift.
3. PostgreSQL para participantes, intentos y progreso.
4. Almacenamiento de objetos para evidencias.
5. Bitácora inmutable y envío de eventos al SIEM.
6. Políticas de privacidad, retención y eliminación.
7. Panel del instructor y trazabilidad de versiones del contenido.
8. Posible integración LMS mediante SCORM o xAPI.

## Ejecución local

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`.

## Contenedor

```bash
podman build -t deidt-cuaderno-devsecops:V01 .
podman run --rm -p 8080:8080 deidt-cuaderno-devsecops:V01
```

## Despliegue OpenShift

```bash
oc new-project formacion-deidt
oc new-build --name=cuaderno-devsecops --binary --strategy=docker
oc start-build cuaderno-devsecops --from-dir=. --follow
oc apply -f openshift/deployment.yaml
oc apply -f openshift/service.yaml
oc apply -f openshift/route.yaml
oc get route cuaderno-devsecops
```

La Route utiliza terminación TLS `edge`, por lo que la aplicación queda disponible mediante HTTPS cuando el clúster cuenta con ingress y certificado configurados.

## Publicación alternativa

Los archivos estáticos pueden publicarse en GitHub Pages. Para registro central de personal, GitHub Pages por sí solo no es suficiente porque no proporciona una base de datos ni autenticación institucional.
