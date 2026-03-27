## But de ce prompt

Le but de ce prompt est de tester plein de truc à la fois. On va concaténé plusieurs projets. 

Voici ce que je cherche à tester : 
- le principe de widget embeddé dans une page web grace à "makerkit/react-embeddable-widget"
- le fait d'envoyer des données à un backend depuis ce widget
- je veux tester la récupération de DOM via plusieurs librairies (/mozilla/readability)
- je veux tester un petit projet appelé "dom-to-semantic-markdown"

## Le projet

Le but est le suivant : intégrer la possibilité d'intégrer un sorte de scraper de contenu web dans un autre projet web, mais le projet web cible ne doit pas faire plus que injecter un script js dans la route du projet.

On va faire 2 test différents : 
- un widget visible via le react-embeddable-widget 
- un widget invisible qui ne sera que l'injection d'un script dans la webpage

Dans les deux cas, le widget / script est à part au projet cible, et pour notre test, on va l'hoster avec python http serve . 

Tu vas également faire un faux site web en html / css / js pour jouer le rôle de la page web hôte. 

on va également faire deux petits backend en fast api pour les échanges de données, un pour le widget et un pour le script injecté.

### premier widget

J'ai déjà clonner le projet react-embeddable-widget, tu vas juste modifier l'app react pour faire ce que je souhaite

L'app va ressembler un peu à ce qui a déjà c'est à dire une bulle en bas à droite de la page. 

au début yaura un bouton "autoriser copilot à lire cette page" et quand on passe à autoriser, on aura un bouton envoyer le contenue.

### deuxième widget

Le deuxième widget c'est un script qui envoie directement le contenu de la page à notre backend toutes les 5 secondes, sans aucune interaction de l'utilisateur.

### le point commun 

Le point commun entre les deux c'est le contenue qui est envoyé à notre backend. 

Ce contenue ça sera un markdown directement calculé à partir du DOM de la page web. 

Essaye de faire le meilleur parsing possible en utilisant à la fois readability et dom-to-semantic-markdown pour faire du markdown sémantique de qualité.

### Le faux site web

Tu vas faire un faux site qui sera volontairement un peu compliqué pour tester la robustesse de notre parsing.

On aura un header avec plusieurs titres, on mettra plusiers sections dont certaines seront côte à côte ... 

Je vais également servir ce site avec python http server pour faire comme si c'était un vrai site web.

### le backend

Le backend vas juste s'occuper de recevoir les données, logger l'appercu, puis l'enregistrer dans un fichier markdown dans ./received_data/ avec un timestamp dans le nom du fichier.

### Ce que tu dois faire

Tu me mets en place les deux widgets, le faux site web, et les deux backend.

Tu me laisse faire les installations et les lancements, puis tu me dis comment tester que tout fonctionne correctement.

Juste tu me fais un readme final du projet qui me dit comment tout mettre en place. 

Pour le faux site, tu n'inclus pas le web widget, tu me donne le tuto de quelle balise "script" je dois ajouter à un projet web pour ajouter le widget. 