---
source: site/content/en/versions.md
source-commit: ecd56c3
status: gate-reviewed
---

## ¿Es el texto de este sitio el texto que firmaría?

El recuadro de arriba lo responde, y es el único lugar de este sitio donde
consta la respuesta. Se lee al generar el sitio, desde un único archivo del
repositorio, de modo que no puede dejar de reflejar la realidad de forma
inadvertida porque alguien olvidara un cambio en algún sitio. Esta página
explica qué significa la respuesta y qué le ocurre al texto el día en que
cambie.

## Qué cambia con el registro

Una iniciativa ciudadana europea se registra sobre un texto fijo. Desde el
día en que la Comisión registra una, el anexo tal como quedó registrado es
lo que se pide firmar a la ciudadanía, y ya no puede modificarse. Ese
requisito tiene pleno sentido: un millón de personas deberían firmar la
misma frase.

Encaja mal con la manera en que está escrito este borrador. El texto mejora
porque se lo ataca, y los ataques no cesarían el día en que se presenta un
formulario. Dos cosas tienen que ser ciertas a la vez, y verse a la vez:

- el **texto registrado** es fijo y es lo que firmó cada persona;
- el **borrador vivo** continúa, porque la eventual respuesta de la Comisión
  debería encontrarse con la mejor versión del argumento y no con la que
  casualmente estaba lista el día de la presentación.

El fallo que esta página quiere evitar es el corriente: un sitio que sigue
editando su texto mientras la gente firma otro, y una captura de pantalla
seis meses después que demuestra que no coinciden.

## La regla, escrita antes de que haga falta

Desde el día del registro:

1. El texto presentado se copia, palabra por palabra, a un directorio que ya
   nunca se edita. Una corrección es una versión nueva, nunca un cambio en
   la antigua.
2. Cada página que muestra el borrador vivo indica que lo es y permite
   acceder al texto registrado con un solo clic.
3. Donde ambos difieran, la diferencia se publica como un diff que puede
   leer por sí mismo. Nadie aquí puede decirle que el cambio fue menor.
4. El texto congelado es el que da fe de lo que se firmó. El borrador vivo
   no da fe de nada hasta que se presente a su vez.

Estas reglas están en [GOVERNANCE.md](https://github.com/ownthemachine/own-the-machine/blob/main/GOVERNANCE.md) del repositorio, adoptadas el
21 de agosto de 2026, mucho antes de que haya nada que congelar. El momento
es justamente lo importante. Una regla sobre lo que puede hacerse con un
texto que la gente ha firmado vale muy poco si se escribe cuando ya se sabe
qué se querría cambiar.

## De dónde procede esta información

El estado de arriba no está escrito a mano en esta página. Se lee al generar
el sitio, desde
[versions/REGISTERED.json](https://github.com/ownthemachine/own-the-machine/blob/main/versions/REGISTERED.json) del repositorio, el único lugar
donde consta la respuesta. Si ese archivo dice alguna vez algo distinto de
esta página, la versión válida es la del archivo y lo que figura en esta
página es erróneo.