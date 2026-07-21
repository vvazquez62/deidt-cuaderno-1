const COURSE_VERSION = 'V01-2026-07';

const GLOSSARY = [
  ['DevOps','Development and Operations','Modelo operativo sociotécnico que integra desarrollo, operación, colaboración, automatización y medición.'],
  ['DevSecOps','Development, Security and Operations','Extensión de DevOps que integra seguridad como responsabilidad compartida durante todo el ciclo.'],
  ['ADM','Architecture Development Method','Método central de TOGAF para desarrollar y gobernar arquitectura empresarial.'],
  ['API','Application Programming Interface','Interfaz que permite que sistemas intercambien funciones o datos mediante contratos definidos.'],
  ['ASVS','Application Security Verification Standard','Estándar OWASP de requisitos verificables de seguridad para aplicaciones.'],
  ['BDD','Base de datos','Componente que almacena y administra información estructurada.'],
  ['CAB','Change Advisory Board','Órgano de asesoría de cambios; no debe convertirse en autorización manual de todo cambio estándar.'],
  ['CD','Continuous Delivery / Deployment','Entrega o despliegue continuo; automatiza el camino de un cambio hasta ambientes controlados.'],
  ['CI','Continuous Integration','Integración continua: fusionar cambios pequeños y validarlos frecuentemente mediante automatización.'],
  ['CI/CD','Continuous Integration / Continuous Delivery','Cadena automatizada para integrar, probar, empaquetar y entregar software.'],
  ['CIS','Center for Internet Security','Organización que publica controles y referencias de endurecimiento.'],
  ['CMMI','Capability Maturity Model Integration','Modelo de mejora de procesos y madurez organizacional.'],
  ['CRD','Custom Resource Definition','Extensión de Kubernetes para definir nuevos tipos de recursos.'],
  ['DAST','Dynamic Application Security Testing','Pruebas de seguridad dinámicas contra una aplicación en ejecución.'],
  ['DEIDT','Dirección Ejecutiva de Innovación y Desarrollo Tecnológico','Área que conduce la evolución funcional y tecnológica considerada en este cuaderno.'],
  ['DGTIC','Dirección General de Tecnologías de la Información y Comunicaciones','Unidad responsable del gobierno institucional de tecnologías de información y comunicaciones.'],
  ['DORA','DevOps Research and Assessment','Programa de investigación y métricas sobre desempeño de entrega de software.'],
  ['DoD','Department of Defense','Departamento de Defensa de Estados Unidos; publica referencias gubernamentales de DevSecOps.'],
  ['DoD / Definition of Done','Definición de terminado','Conjunto verificable de condiciones que una entrega debe cumplir para considerarse terminada.'],
  ['Git','Sistema de control de versiones','Registra cambios de código y documentos, permitiendo trazabilidad y colaboración.'],
  ['GitOps','Operación basada en Git','Práctica que declara infraestructura y despliegues en repositorios versionados y reconciliados automáticamente.'],
  ['IA','Inteligencia artificial','Tecnologías capaces de apoyar análisis, generación o clasificación; requieren gobierno y validación humana.'],
  ['IaC','Infrastructure as Code','Definición de infraestructura mediante archivos versionados, revisables y reproducibles.'],
  ['IDOR','Insecure Direct Object Reference','Falla de autorización donde un usuario accede a objetos ajenos manipulando identificadores.'],
  ['IDE','Integrated Development Environment','Entorno integrado para escribir, ejecutar, depurar y revisar código.'],
  ['ITIL','Information Technology Infrastructure Library','Marco de mejores prácticas para gestionar productos y servicios digitales.'],
  ['ITSM','IT Service Management','Gestión de servicios de tecnología de información.'],
  ['JSON','JavaScript Object Notation','Formato de intercambio de datos legible por personas y sistemas.'],
  ['KPI','Key Performance Indicator','Indicador clave de desempeño.'],
  ['Kubernetes','Orquestador de contenedores','Plataforma para desplegar, escalar y administrar cargas contenerizadas.'],
  ['LMS','Learning Management System','Sistema de gestión del aprendizaje con usuarios, cursos, evaluaciones y registros.'],
  ['MTTR','Mean Time to Restore/Recover','Tiempo medio para restaurar o recuperar un servicio.'],
  ['NIST','National Institute of Standards and Technology','Institución estadounidense que publica estándares y guías técnicas.'],
  ['OAuth 2.0','Authorization Framework','Marco para delegar autorización entre aplicaciones.'],
  ['OIDC','OpenID Connect','Capa de identidad sobre OAuth 2.0 usada para inicio de sesión federado.'],
  ['OpenShift','Plataforma empresarial de aplicaciones','Distribución empresarial de Kubernetes con capacidades de desarrollo, operación y seguridad.'],
  ['OWASP','Open Worldwide Application Security Project','Comunidad abierta que publica referencias de seguridad de aplicaciones.'],
  ['PO','Product Owner','Responsable de representar valor, prioridad y aceptación del producto.'],
  ['QA','Quality Assurance','Aseguramiento de calidad mediante criterios, pruebas y evidencia.'],
  ['RACI','Responsible, Accountable, Consulted, Informed','Matriz para aclarar quién ejecuta, responde, consulta y recibe información.'],
  ['RBAC','Role-Based Access Control','Control de acceso basado en roles.'],
  ['REST','Representational State Transfer','Estilo de diseño usado comúnmente para servicios web.'],
  ['SAMM','Software Assurance Maturity Model','Modelo OWASP para evaluar y mejorar la madurez de seguridad del desarrollo de software.'],
  ['SAST','Static Application Security Testing','Análisis estático de seguridad sobre código o binarios sin ejecutar la aplicación.'],
  ['SBOM','Software Bill of Materials','Inventario de componentes y dependencias que integran un producto de software.'],
  ['SCA','Software Composition Analysis','Análisis de dependencias, licencias y vulnerabilidades de componentes de terceros.'],
  ['SCM','Source Code Management','Gestión del código fuente y sus versiones.'],
  ['SDLC','Software Development Life Cycle','Ciclo de vida de desarrollo de software.'],
  ['SIEM','Security Information and Event Management','Plataforma para centralizar, correlacionar y alertar sobre eventos de seguridad.'],
  ['SLA','Service Level Agreement','Acuerdo de nivel de servicio con compromisos medibles.'],
  ['SLO','Service Level Objective','Objetivo cuantitativo de nivel de servicio.'],
  ['SLI','Service Level Indicator','Medición utilizada para evaluar un objetivo de servicio.'],
  ['SLSA','Supply-chain Levels for Software Artifacts','Marco para elevar la integridad de la cadena de suministro de software.'],
  ['SOA','Service-Oriented Architecture','Arquitectura orientada a servicios.'],
  ['SSDF','Secure Software Development Framework','Marco NIST de prácticas de desarrollo seguro.'],
  ['SSO','Single Sign-On','Inicio de sesión único para acceder a varios servicios.'],
  ['SRE','Site Reliability Engineering','Disciplina que aplica ingeniería de software a confiabilidad y operación.'],
  ['Tekton','Marco de pipelines nativo de Kubernetes','Proyecto que aporta recursos para definir y ejecutar tareas y pipelines en Kubernetes.'],
  ['TOGAF','The Open Group Architecture Framework','Marco de arquitectura empresarial mantenido por The Open Group.'],
  ['UI','User Interface','Interfaz mediante la cual una persona interactúa con un sistema.'],
  ['UX','User Experience','Experiencia total de una persona al utilizar un producto o servicio.'],
  ['WIP','Work in Progress','Trabajo en proceso; limitarlo ayuda a reducir colas y tiempos de entrega.'],
  ['xAPI','Experience API','Estándar para registrar experiencias de aprendizaje en un almacén de registros.'],
  ['Zero Trust','Confianza cero','Enfoque de seguridad que verifica explícitamente cada acceso y minimiza privilegios.']
].map(([acronym,name,definition])=>({acronym,name,definition}));

const SOURCES = {
  devopsdays:{id:'devopsdays',title:'DevOpsDays · Historia oficial',url:'https://devopsdays.org/about',note:'Identifique el origen comunitario del movimiento y el primer evento de 2009.'},
  redhatDevops:{id:'redhatDevops',title:'Red Hat · ¿Qué es DevOps?',url:'https://www.redhat.com/es/topics/devops',note:'Revise cultura, automatización, colaboración y plataformas.'},
  dora:{id:'dora',title:'DORA · Investigación',url:'https://dora.dev/research/',note:'Reconozca que el desempeño se mide con resultados de entrega y operación.'},
  nist:{id:'nist',title:'NIST SP 800-218 SSDF 1.1 en español',url:'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.spa.pdf',note:'Revise las cuatro familias de prácticas del SSDF.'},
  samm:{id:'samm',title:'OWASP SAMM',url:'https://owasp.org/www-project-samm/',note:'Observe cómo evaluar y mejorar madurez de seguridad de software.'},
  asvs:{id:'asvs',title:'OWASP ASVS',url:'https://owasp.org/www-project-application-security-verification-standard/',note:'Identifique requisitos verificables que pueden transformarse en criterios de aceptación.'},
  itil:{id:'itil',title:'ITIL · Portal oficial',url:'https://itil.com/',note:'Revise la orientación a valor, productos, servicios y mejora continua. Confirme la versión institucional antes de formalizar evaluaciones.'},
  togaf:{id:'togaf',title:'TOGAF Standard, 10th Edition',url:'https://www.opengroup.org/togaf-standard-10th-edition-downloads',note:'Revise estructura, ADM, gobierno y guías de aplicación.'},
  pipelines:{id:'pipelines',title:'Red Hat OpenShift Pipelines',url:'https://docs.redhat.com/en/documentation/red_hat_openshift_pipelines/',note:'Identifique Tekton, recursos Kubernetes y definición versionada de pipelines.'},
  labPipelines:{id:'labPipelines',title:'Laboratorio Red Hat · Using OpenShift Pipelines',url:'https://developers.redhat.com/learn/openshift/using-openshift-pipelines',note:'Recorra el ejemplo de construcción y despliegue automatizado.'},
  devsecops:{id:'devsecops',title:'Red Hat · ¿Qué es DevSecOps?',url:'https://www.redhat.com/es/topics/devops/what-is-devsecops',note:'Revise seguridad compartida, automatización y desplazamiento temprano y operativo de controles.'}
};

const MESA_TEXT = {
  competencia:'Define valor, prioridad, alcance, criterios de aceptación y riesgo de negocio.',
  arquitectura:'Define arquitectura objetivo, patrones, tecnologías permitidas, excepciones e integración.',
  produccion:'Construye, prueba, versiona, documenta y entrega artefactos reproducibles.',
  calidad:'Valida calidad y seguridad, autoriza el pase, verifica reversa, evidencia y observabilidad.'
};

const COURSE_MODULES = [
  {
    id:'m0',number:0,title:'Ingreso y diagnóstico',duration:'30 min',passScore:0,evidenceRequired:false,
    summary:'Registra al participante, presenta el propósito del curso y levanta una línea base sin calificación de aprobación.',
    objectives:['Identificar el propósito institucional del cuaderno.','Reconocer su mesa principal y responsabilidades.','Establecer una línea base individual.'],
    terms:['DEIDT','DGTIC','DevOps','DevSecOps','ITIL','TOGAF'],
    sources:[],
    mesa:{competencia:'Expresa qué problema de aprendizaje debe resolverse.',arquitectura:'Ubica conceptos dentro del modelo institucional.',produccion:'Identifica prácticas actuales de construcción.',calidad:'Reconoce evidencia y criterios de aprobación.'},
    routine:['Lea el propósito y el flujo del cuaderno.','Ubique su función principal dentro de las cuatro mesas.','Responda el diagnóstico con honestidad; no afecta la aprobación final.'],
    evidencePrompt:'Escriba en 80 a 250 palabras qué espera cambiar en su trabajo después de cursar este cuaderno.',
    quiz:[
      q('DevOps es principalmente…',['Una herramienta de despliegue','Un modelo operativo sociotécnico','Una certificación obligatoria','Un producto de OpenShift'],1,'DevOps combina cultura, prácticas, automatización y responsabilidad compartida.'),
      q('DevSecOps busca…',['Revisar seguridad sólo al final','Integrar seguridad durante todo el ciclo','Eliminar las pruebas funcionales','Sustituir ITIL'],1,'La seguridad se incorpora desde requisitos hasta operación.'),
      q('TOGAF se usa principalmente para…',['Arquitectura empresarial','Escaneo dinámico','Gestión de incidentes','Programación de pipelines'],0,'TOGAF organiza el desarrollo y gobierno de arquitectura empresarial.'),
      q('ITIL aporta principalmente…',['Un lenguaje de programación','Gestión de productos y servicios','Un motor de contenedores','Pruebas SAST'],1,'ITIL aporta prácticas para creación, entrega, soporte y mejora de valor mediante servicios.'),
      q('En la DEIDT, el proveedor debe…',['Definir unilateralmente el proceso','Trabajar dentro del gobierno institucional','Conservar el código fuera de SICT','Liberar directamente a producción'],1,'El proveedor se incorpora al proceso institucional, no lo sustituye.')
    ]
  },
  {
    id:'m1',number:1,title:'Lenguaje común y acrónimos',duration:'60 min',passScore:80,evidenceRequired:true,
    summary:'Construye un vocabulario compartido para evitar que cada área interprete de manera distinta los mismos términos.',
    objectives:['Distinguir modelo, marco, práctica, herramienta y plataforma.','Dominar los acrónimos esenciales del curso.','Explicar el modelo con palabras comprensibles para personal no técnico.'],
    terms:['CI','CD','CI/CD','SAST','DAST','SCA','SBOM','SSDF','ASVS','SAMM','SLA','SLO','SLI'],
    sources:[SOURCES.redhatDevops],
    mesa:{competencia:'Usa conceptos comunes al definir demanda y aceptación.',arquitectura:'Normaliza términos y estándares.',produccion:'Relaciona prácticas con herramientas concretas.',calidad:'Convierte términos en evidencia verificable.'},
    routine:['Use el buscador del glosario y revise al menos 15 términos.','Explique a otra persona la diferencia entre DevOps, DevSecOps y OpenShift.','Construya un ejemplo que conecte CI, SAST, SBOM y CD.'],
    evidencePrompt:'Redacte una explicación de 120 a 250 palabras para un director no técnico: qué es DevSecOps, qué no es y cómo se relaciona con OpenShift.',
    quiz:[
      q('¿Qué es OpenShift?',['La metodología DevOps','Una plataforma empresarial de aplicaciones basada en Kubernetes','Un marco de arquitectura','Una práctica ITIL'],1,'OpenShift soporta prácticas DevSecOps, pero no es la metodología.'),
      q('SAST analiza…',['La aplicación en ejecución','Código o binarios sin ejecutar la aplicación','Sólo contratos de servicio','Únicamente la red'],1,'SAST es análisis estático.'),
      q('SBOM significa…',['Acuerdo de nivel de servicio','Inventario de componentes de software','Modelo de arquitectura','Prueba dinámica'],1,'La SBOM documenta componentes y dependencias.'),
      q('SLA, SLO y SLI se relacionan con…',['Niveles y medición del servicio','Control de versiones','Lenguajes de programación','Modelado de amenazas'],0,'SLI mide, SLO fija objetivo y SLA formaliza compromisos.'),
      q('CI/CD es…',['Un área organizacional','Una cadena de integración y entrega automatizada','Un escáner de vulnerabilidades','Un estándar de arquitectura'],1,'CI/CD automatiza integración, validación y entrega.')
    ]
  },
  {
    id:'m2',number:2,title:'DevOps: origen, propósito y prácticas',duration:'75 min',passScore:80,evidenceRequired:true,
    summary:'Explica por qué surgió DevOps, quién lo impulsa y por qué no pertenece a un solo fabricante.',
    objectives:['Reconocer el origen comunitario de DevOps.','Identificar cultura, flujo, retroalimentación, automatización y medición.','Evitar reducir DevOps a herramientas o a un puesto aislado.'],
    terms:['DevOps','DORA','WIP','Git','CI/CD','IaC','SRE'],
    sources:[SOURCES.devopsdays,SOURCES.dora],
    mesa:{competencia:'Prioriza valor y reduce colas de demanda.',arquitectura:'Diseña para cambios pequeños y desacoplados.',produccion:'Integra cambios frecuentes con pruebas automáticas.',calidad:'Retroalimenta desde operación y fallas reales.'},
    routine:['Revise la historia oficial de DevOpsDays.','Dibuje el flujo actual desde solicitud hasta producción.','Marque esperas, transferencias y retrabajo; proponga reducir un cuello de botella.'],
    evidencePrompt:'Describa un flujo real de la DEIDT con al menos un cuello de botella, su causa y una mejora DevOps medible.',
    quiz:[
      q('El primer DevOpsDays se realizó en…',['2001','2009','2016','2022'],1,'El primer DevOpsDays ocurrió en Gante, Bélgica, en 2009.'),
      q('DevOps tiene un propietario único mundial…',['Verdadero','Falso'],1,'Es un movimiento y modelo de prácticas impulsado por comunidades, investigación y organizaciones.'),
      q('Una señal de adopción superficial es…',['Reducir lotes','Medir flujo','Crear un área DevOps aislada y dejar los silos intactos','Automatizar pruebas'],2,'Un nuevo silo no resuelve la colaboración extremo a extremo.'),
      q('Limitar WIP ayuda a…',['Aumentar trabajo simultáneo','Reducir colas y terminar antes','Eliminar trazabilidad','Evitar priorización'],1,'Menor trabajo en proceso favorece flujo y terminación.'),
      q('DORA se utiliza para…',['Diseñar bases de datos','Investigar capacidades y medir desempeño de entrega','Certificar TOGAF','Administrar identidades'],1,'DORA aporta investigación, capacidades y métricas de desempeño.')
    ]
  },
  {
    id:'m3',number:3,title:'DevSecOps y desarrollo seguro',duration:'100 min',passScore:80,evidenceRequired:true,
    summary:'Integra seguridad como responsabilidad compartida, automatizada y demostrable desde requisitos hasta operación.',
    objectives:['Comprender el papel de NIST SSDF, OWASP SAMM y ASVS.','Distinguir SAST, DAST, SCA, secretos, SBOM y pruebas de autorización.','Definir compuertas de seguridad proporcionales al riesgo.'],
    terms:['DevSecOps','SSDF','SAMM','ASVS','SAST','DAST','SCA','SBOM','IDOR','Zero Trust','SIEM'],
    sources:[SOURCES.nist,SOURCES.samm,SOURCES.asvs,SOURCES.devsecops],
    mesa:{competencia:'Incluye seguridad y privacidad en alcance y aceptación.',arquitectura:'Modela amenazas y define patrones seguros.',produccion:'Codifica, prueba dependencias, secretos e imágenes.',calidad:'Valida hallazgos, autorización, evidencias y riesgo residual.'},
    routine:['Seleccione un sistema y enumere activos, actores y amenazas.','Defina tres requisitos ASVS aplicables.','Diseñe una compuerta que bloquee secretos y vulnerabilidades críticas.'],
    evidencePrompt:'Presente un mini modelo de amenazas de un sistema: activo, actor, amenaza, control preventivo, prueba y evidencia. Incluya un caso de IDOR.',
    quiz:[
      q('El SSDF de NIST…',['Obliga a usar una marca','Define prácticas de alto nivel integrables al SDLC','Sustituye toda arquitectura','Sólo aplica a defensa'],1,'SSDF es independiente de herramientas y se integra al ciclo existente.'),
      q('OWASP SAMM sirve para…',['Medir madurez de seguridad de software','Desplegar contenedores','Registrar incidentes','Administrar contratos'],0,'SAMM ayuda a evaluar y mejorar madurez.'),
      q('ASVS puede usarse como…',['Catálogo verificable de requisitos de seguridad','Repositorio de código','Base de datos','Orquestador'],0,'ASVS permite convertir controles en requisitos y pruebas.'),
      q('IDOR es principalmente una falla de…',['Disponibilidad','Autorización','Compresión','Respaldo'],1,'IDOR permite acceder a objetos sin autorización adecuada.'),
      q('Una compuerta inicial razonable bloquea…',['Todo hallazgo bajo sin contexto','Secretos expuestos y vulnerabilidades críticas explotables','Sólo errores visuales','Únicamente documentación incompleta'],1,'Las compuertas deben priorizar riesgo real y controles no negociables.')
    ]
  },
  {
    id:'m4',number:4,title:'ITIL y operación del servicio',duration:'80 min',passScore:80,evidenceRequired:true,
    summary:'Relaciona la entrega de software con la gestión institucional del servicio, cambios, incidentes, problemas y mejora continua.',
    objectives:['Entender que DevSecOps e ITIL son complementarios.','Relacionar pipelines con habilitación de cambios, liberación e incidentes.','Distinguir cambio estándar, normal y de emergencia.'],
    terms:['ITIL','ITSM','SLA','SLO','SLI','CAB','MTTR','KPI'],
    sources:[SOURCES.itil],
    mesa:{competencia:'Relaciona demanda con valor y niveles de servicio.',arquitectura:'Asegura continuidad y requisitos no funcionales.',produccion:'Entrega cambios trazables y repetibles.',calidad:'Habilita cambios, liberaciones, incidentes, problemas y mejora.'},
    routine:['Clasifique tres cambios reales como estándar, normal o emergencia.','Relacione un despliegue con incidente, problema y mejora.','Defina un SLI y un SLO para un servicio crítico.'],
    evidencePrompt:'Describa cómo un cambio de bajo riesgo puede ser preautorizado mediante pipeline, manteniendo control ITIL, reversa y evidencia.',
    quiz:[
      q('DevSecOps e ITIL…',['Son incompatibles','Se complementan','Son la misma cosa','Sólo aplican a proveedores'],1,'DevSecOps entrega cambios; ITIL gobierna productos y servicios.'),
      q('Un cambio estándar debe ser…',['Repetible, de bajo riesgo y preautorizado','Improvisado','Siempre aprobado en reunión','Sin evidencia'],0,'La preautorización se basa en procedimiento conocido y riesgo controlado.'),
      q('MTTR mide…',['Frecuencia de commits','Tiempo para restaurar o recuperar','Número de arquitecturas','Costo de licencias'],1,'MTTR ayuda a evaluar capacidad de recuperación.'),
      q('Un incidente busca primero…',['Encontrar causa raíz definitiva','Restaurar el servicio','Rediseñar toda la arquitectura','Cambiar proveedor'],1,'La prioridad del incidente es recuperar el servicio; el problema aborda causa raíz.'),
      q('La automatización de cambios elimina el gobierno…',['Verdadero','Falso'],1,'Automatiza controles y evidencia; no elimina responsabilidad ni gobierno.')
    ]
  },
  {
    id:'m5',number:5,title:'TOGAF y arquitectura empresarial',duration:'90 min',passScore:80,evidenceRequired:true,
    summary:'Conecta visión, arquitectura objetivo, estándares y hoja de ruta con la construcción incremental mediante DevSecOps.',
    objectives:['Reconocer arquitectura actual, objetivo y transición.','Comprender el papel del ADM y el gobierno de arquitectura.','Convertir principios arquitectónicos en controles verificables.'],
    terms:['TOGAF','ADM','API','SOA','RACI','KPI','IaC'],
    sources:[SOURCES.togaf],
    mesa:{competencia:'Aporta necesidades, valor y restricciones de negocio.',arquitectura:'Conduce visión, estado actual, objetivo, brechas y gobierno.',produccion:'Implementa bloques y patrones aprobados.',calidad:'Verifica conformidad, excepciones y resultados en operación.'},
    routine:['Elija un principio arquitectónico y conviértalo en una regla verificable.','Identifique arquitectura actual, objetivo y un estado de transición.','Defina cómo registrar una excepción técnica con vigencia y responsable.'],
    evidencePrompt:'Elabore una mini ficha: situación actual, arquitectura objetivo, brecha, transición, regla DevSecOps y evidencia de conformidad.',
    quiz:[
      q('TOGAF se orienta a…',['Arquitectura empresarial','Escaneo DAST','Gestión de nómina','Pruebas unitarias'],0,'TOGAF estructura el desarrollo y gobierno de arquitectura empresarial.'),
      q('El ADM es…',['Un motor CI/CD','El método de desarrollo de arquitectura de TOGAF','Un tipo de vulnerabilidad','Una práctica de incidentes'],1,'ADM organiza fases iterativas de arquitectura.'),
      q('DevSecOps frente a TOGAF…',['Sustituye arquitectura','Implementa y retroalimenta la arquitectura incrementalmente','Elimina estándares','Sólo aplica al final'],1,'La arquitectura guía; el ciclo de entrega materializa y genera retroalimentación.'),
      q('Una excepción técnica debe…',['Quedar indefinida','Tener justificación, riesgo, responsable y vigencia','Ser verbal','Ser decidida por el proveedor'],1,'La excepción es gobernada y temporal, no una renuncia al estándar.'),
      q('Un principio sin prueba ni control…',['Es automáticamente cumplido','Puede quedar sólo como declaración','Se convierte en SAST','Sustituye el diseño'],1,'Los principios deben transformarse en patrones y criterios verificables.')
    ]
  },
  {
    id:'m6',number:6,title:'OpenShift, CI/CD y evidencia técnica',duration:'110 min',passScore:80,evidenceRequired:true,
    summary:'Lleva los conceptos a una cadena institucional de repositorio, pruebas, artefactos, despliegue, reversa y observabilidad.',
    objectives:['Distinguir plataforma de modelo operativo.','Comprender el flujo Git–pipeline–imagen–OpenShift.','Definir expediente técnico automático por liberación.'],
    terms:['OpenShift','Kubernetes','Tekton','CRD','GitOps','CI/CD','SAST','SCA','SBOM','DAST','SIEM'],
    sources:[SOURCES.pipelines,SOURCES.labPipelines],
    mesa:{competencia:'Proporciona alcance y aceptación trazable al ticket.',arquitectura:'Selecciona plantilla, patrón, entorno y políticas.',produccion:'Construye mediante repositorio y pipeline institucional.',calidad:'Verifica pruebas, firma, despliegue, reversa y telemetría.'},
    routine:['Dibuje el pipeline mínimo de un sistema.','Marque las entradas, salidas y evidencia de cada etapa.','Defina qué falla bloquea y qué hallazgo puede gestionarse como deuda.'],
    evidencePrompt:'Diseñe un pipeline con: commit, revisión, pruebas, SAST, SCA, secretos, SBOM, imagen, despliegue QA, DAST, aprobación, producción, reversa y observabilidad.',
    quiz:[
      q('OpenShift Pipelines se basa en…',['Tekton','TOGAF ADM','ITIL CAB','OWASP SAMM'],0,'OpenShift Pipelines usa recursos de Tekton sobre Kubernetes.'),
      q('El código del proveedor debe residir…',['En repositorios personales','En repositorios institucionales','Sólo en archivos comprimidos','Fuera de la SICT'],1,'La institución debe conservar control, trazabilidad y continuidad.'),
      q('Una imagen desplegable debe relacionarse con…',['Un commit y una ejecución de pipeline','Sólo un correo','Una reunión informal','Un nombre manual'],0,'La trazabilidad debe unir solicitud, código, pruebas y artefacto.'),
      q('GitOps aplica control de versiones a…',['Infraestructura y despliegue declarativo','Únicamente documentos Word','Llamadas telefónicas','Contratos sin código'],0,'GitOps usa Git como fuente declarativa de configuración y despliegue.'),
      q('El expediente técnico puede incluir…',['Resultados de pruebas, SBOM, versión y reversa','Sólo horas trabajadas','Sólo una captura','Únicamente el nombre del desarrollador'],0,'La evidencia debe ser reproducible y asociada a la entrega.')
    ]
  },
  {
    id:'m7',number:7,title:'Cuatro mesas y barras transversales',duration:'100 min',passScore:80,evidenceRequired:true,
    summary:'Integra Competencia, Arquitectura, Producción y Calidad con Seguridad, DevSecOps, Observabilidad, Gobierno y Cumplimiento.',
    objectives:['Aplicar separación de funciones sin crear silos.','Definir compuertas y transferencias con evidencia.','Asignar responsabilidades internas y del proveedor.'],
    terms:['PO','QA','RACI','SIEM','SLA','RBAC','SSO','KPI'],
    sources:[SOURCES.dora,SOURCES.nist],
    mesa:{competencia:'Recibe, clasifica, prioriza y define aceptación.',arquitectura:'Dictamina plataforma, integración, riesgo y reutilización.',produccion:'Construye, corrige, documenta y versiona.',calidad:'Prueba, libera, monitorea y cierra con evidencia.'},
    routine:['Tome un cambio real y recórralo por las cuatro mesas.','Identifique controles de cada barra transversal.','Prepare una matriz RACI breve para personal interno y proveedor.'],
    evidencePrompt:'Presente el recorrido de un cambio real por las cuatro mesas. Para cada etapa indique entrada, responsable, producto, compuerta, evidencia y barra transversal aplicable.',
    quiz:[
      q('Quien construye un cambio crítico debe también autorizar unilateralmente su liberación…',['Verdadero','Falso'],1,'La separación de funciones reduce conflicto de interés y riesgo.'),
      q('La Mesa de Competencia define principalmente…',['Prioridad, alcance y aceptación','Reglas de firewall','Código fuente','Administración de clúster'],0,'Competencia gobierna demanda y valor.'),
      q('Observabilidad debe existir…',['Sólo después de incidentes','Desde el diseño y durante operación','Sólo en sistemas nuevos externos','Únicamente en infraestructura'],1,'Métricas, logs, trazas y eventos deben diseñarse y operarse.'),
      q('El proveedor debe…',['Crear su propio proceso separado','Incorporarse al camino institucional','Controlar productivo sin supervisión','Conservar evidencia fuera de la SICT'],1,'El camino institucional debe ser común para internos y externos.'),
      q('Gobierno y cumplimiento son…',['Revisiones decorativas','Barras transversales con controles y evidencia','Sinónimos de programación','Responsabilidad exclusiva del jurídico'],1,'Atraviesan decisiones, cambios, evidencias y responsabilidades.')
    ]
  },
  {
    id:'m8',number:8,title:'Evaluación integradora y compromiso',duration:'90 min',passScore:80,evidenceRequired:true,
    summary:'Demuestra que el participante puede explicar y aplicar el modelo completo en un caso institucional.',
    objectives:['Integrar DevSecOps, ITIL, TOGAF y OpenShift.','Defender responsabilidades de las cuatro mesas.','Proponer un primer cambio aplicable a su trabajo.'],
    terms:['DevSecOps','ITIL','TOGAF','OpenShift','SSDF','ASVS','DORA','CI/CD','SIEM'],
    sources:[],
    mesa:{competencia:'Valida valor y aceptación del caso.',arquitectura:'Valida conformidad con arquitectura objetivo.',produccion:'Demuestra construcción y entrega reproducibles.',calidad:'Demuestra liberación, operación y evidencia.'},
    routine:['Resuelva el caso integrador sin consultar primero sus notas.','Revise respuestas incorrectas y vuelva a intentarlo.','Defina un compromiso de aplicación para los próximos 30 días.'],
    evidencePrompt:'Caso final: un proveedor debe modificar un sistema expuesto al ciudadano. Describa el recorrido completo desde demanda hasta operación, incluyendo arquitectura, seguridad, ITIL, pipeline, evidencias, reversa y métricas.',
    quiz:[
      q('La relación correcta es…',['TOGAF construye; OpenShift gobierna; ITIL escanea','TOGAF orienta arquitectura; DevSecOps entrega; ITIL gobierna servicio; OpenShift soporta ejecución','ITIL sustituye TOGAF','OpenShift sustituye DevSecOps'],1,'Cada elemento cumple una función complementaria.'),
      q('El criterio principal para liberar debe ser…',['Presión de fecha','Evidencia de criterios satisfechos y riesgo aceptado','Antigüedad del desarrollador','Número de reuniones'],1,'La liberación se sustenta en evidencia objetiva.'),
      q('Una vulnerabilidad crítica introducida por el proveedor…',['Se acepta sin análisis','Debe corregirse conforme a obligaciones y criterios contractuales','Se convierte en mejora opcional','Se oculta del expediente'],1,'La seguridad debe ser parte de la aceptación y garantía.'),
      q('Una métrica útil combina…',['Velocidad y estabilidad','Sólo cantidad de código','Sólo horas trabajadas','Sólo número de personas'],0,'El desempeño requiere observar flujo, calidad, confiabilidad y recuperación.'),
      q('El objetivo inicial realista es…',['Declarar madurez máxima','Lograr un camino institucional mínimo, repetible y medible','Modernizar todo a la vez','Eliminar supervisión humana'],1,'La adopción debe progresar mediante pilotos y mejora continua.'),
      q('La evidencia de aprendizaje final debe…',['Ser genérica','Aplicarse a un caso institucional concreto','Omitir riesgos','Depender sólo de memoria'],1,'La aplicación al contexto demuestra comprensión transferible.')
    ]
  }
];

function q(text,options,correct,explanation){return{text,options,correct,explanation};}
