---
source: site/content/en/versions.md
source-commit: ecd56c3
status: gate-reviewed
---

## Le texte de ce site est-il celui que vous signeriez ?

L'encadré ci-dessus y répond, et c'est le seul endroit du site où la réponse
est consignée. Elle est lue lors de la génération du site, dans un seul
fichier du dépôt, de sorte qu'elle ne peut pas s'écarter discrètement de la
vérité parce que quelqu'un aurait oublié de la mettre à jour quelque part.
Cette page explique ce que la réponse signifie, et ce qu'il advient du texte
le jour où elle change.

## Ce que change l'enregistrement

L'enregistrement d'une initiative citoyenne européenne porte sur un texte
figé. À compter du jour où la Commission en enregistre une, l'annexe telle
qu'elle a été enregistrée est ce qu'il est demandé au citoyen de signer, et
elle ne peut plus être modifiée. Cette exigence est saine : un million de
personnes devraient signer la même phrase.

Elle s'accorde mal avec la manière dont ce projet est écrit. Le texte
s'améliore parce qu'il est attaqué, et les attaques ne cesseraient pas le
jour du dépôt d'un formulaire. Deux choses doivent donc rester vraies en
même temps, et visibles en même temps :

- le **texte enregistré** est figé et correspond à ce qui a été signé ;
- le **projet vivant** se poursuit, parce que la réponse éventuelle de la
  Commission doit s'adresser à la meilleure version de l'argumentation, et
  non à celle qui se trouvait prête le jour du dépôt.

L'écueil que cette page vise à éviter est le plus banal : un site qui
continue de modifier son texte pendant que des gens en signent un autre, et
une capture d'écran six mois plus tard montrant que les deux ne concordent
pas.

## La règle, écrite avant d'être nécessaire

À compter du jour de l'enregistrement :

1. Le texte déposé est copié, mot pour mot, dans un répertoire qui n'est
   plus jamais modifié. Une correction est une nouvelle version, jamais une
   modification de l'ancienne.
2. Chaque page affichant le projet vivant indique qu'il s'agit du projet
   vivant et donne accès au texte enregistré en un clic.
3. Là où les deux diffèrent, la différence est publiée sous forme de diff
   que vous pouvez lire vous-même. Personne ici n'a le droit de vous dire
   que la modification était mineure.
4. Le texte figé fait foi de ce qui a été signé. Le projet vivant ne fait
   foi de rien tant qu'il n'est pas déposé à son tour.

Ces règles figurent dans
[GOVERNANCE.md](https://github.com/ownthemachine/own-the-machine/blob/main/GOVERNANCE.md) du dépôt ; elles ont été adoptées le 21
août 2026, bien avant qu'il y ait quoi que ce soit à figer. Ce calendrier
est précisément l'enjeu. Une règle sur ce que l'on peut faire d'un texte que
des gens ont signé ne vaut pas grand-chose si elle est écrite une fois que
l'on sait déjà ce que l'on aimerait changer.

## D'où provient cette information

L'état ci-dessus n'est pas saisi dans cette page. Il est lu lors de la
génération du site, dans
[versions/REGISTERED.json](https://github.com/ownthemachine/own-the-machine/blob/main/versions/REGISTERED.json) du dépôt, seul endroit où la
réponse est consignée. Si ce fichier dit un jour autre chose que cette page,
c'est le fichier qui a raison et cette page qui est erronée.