---
layout: post
date: 2014-05-24 19:17:00
title: Comment bien rédiger ses spécifications agiles
tags: Specifications, Agile
published: true
disqus: true
excerpt: J'ai envie de tordre le coup à une idée que je rencontre souvent dans les équipes de développeurs au sein desquelles j'interviens. La rédaction de spécifications (fonctionnelles ou techniques) n'est pas incompatible avec l'agilité. Le point étant éclairci, le suivant est de savoir qu'est-ce qu'une bonne spécification agile et comment les rédiger au mieux ?
---
J'ai envie de tordre le coup à une idée que je rencontre souvent dans les équipes de développeurs au sein desquelles j'interviens. La rédaction de spécifications (fonctionnelles ou techniques) n'est pas incompatible avec l'agilité.

Le manifeste agile préconise *un logiciel qui marche plutôt qu'une documentation exhaustive*. A aucun moment cela ne signifie que la documentation est interdite par l'agilité, et ce, quelque soit sa forme (spécifications technique/fonctionnelle, JavaDoc, dossier d'architecture, etc.). Il s'agit selon moi d'une mauvaise interprétation du manifeste agile.

Remarque : le manifeste agile n'est qu'un condensé des valeurs et principes partagées par plusieurs méthodes de travail et d'organisation pour améliorer l'industrie du développement logiciel. A mon sens, il faut le voir comme un PGCD de ces méthodes (XP, Scrum, RUP, Lean, etc.) plutôt qu'une bible à valeur divine. Si l'on file la métaphore, il est d'ailleurs cocasse de noter que, comme tout livre de référence religieuse, il est fortement sujet à interprétation et nécesite d'être adapté à un contexte, une vision, une *culture* (par exemple celle de l'entreprise).

Le point étant éclairci, le suivant est de savoir qu'est-ce qu'une bonne spécification agile et comment les rédiger au mieux ?

## Quel intérêt ?

L'intérêt premier de rédiger des spécifications est de **faire l'effort de se projeter et envisager les scénarios possibles** pour une problématique donnée. De fait, la phase de réflexion qui précède la rédaction des spécifications est plus importante que le livrable en lui-même.

L'autre enjeu des spécifications est de **permettre aux développeurs d'implémenter efficacement (de façon simple, rapide, exhaustive) les fonctionnalités du produit**, avec une substance minimale leur conférant un maximum d'autonomie.

Comme toute tâche d'un projet mené en agile, il faut que les spécifications -- de même que les fonctionnalité qu'elles décrivent -- apportent de la valeur ajoutée. Autrement dit, il ne faut pas qu'elles pénalisent le développement de l'application : soit en bloquant le démarrage du projet / sprint / développement, soit en bloquant l'équipe, car trop floues erronnéees, incohérentes.

De façon générale, **le véritable intérêt des spécifications est d'accélérer la phase de cadrage et de build** d'un projet informatique.

En revanche, et c'est ma conviction, il est utopique de croire que mêmes labellisées "agiles", des specs vont améliorer la productivité de l'équipe en charge de la TMA du produit lors de la phase de *run*. Au mieux, et c'est déjà le cas de nos bons vieux cahiers des charges, elles seront un point de départ ou une piste de réflexion lorsqu'il faudra analyser un bug ou revoir une fonctionnalité, qui nécessiteront quoiqu'il en soit la présence et la capacité d'experts à un moment donné.

## Démarche de rédaction de spécifications fonctionnelles

### Le fond

Des spécifications fonctionnelles vont servir :

- au Métier : pour évaluer le besoin, envisager une solution fonctionnelle, détecter les "trous dans la raquette", etc.
- à l'Equipe : pour comprendre le besoin, envisager une solution technique en adéquation avec l'architecture ou l'existant et savoir ce qui est attendu

Les premiers vont ainsi s'intéresser aux profils utilisateurs, aux fonctionnalités, à la fréquence de déclenchement, aux conséquences sur le domaine, quand les seconds seront particulièrement attentifs aux comportements / interactions du Système, aux évènements et conditions de déclenchement des traitements associés et aux critères de validation de la bonne implémentation du besoin.

#### Les questions à se poser

Lors d'atelier de réflexion avec le Métier / PO sur une thématique ou un ensemble fonctionnel donné, j'adopte la démarche suivante :

1. Lister les utilisateurs (les "acteurs")
1. Lister les fonctionnalités (les "actions")
1. Lister les objets métiers en jeu
1. Relier les acteurs aux fonctionnalités
1. Lister les conséquences des actions :
  - sur les objets du domaine
  - sur le SI
1. Déterminer les vérifications à faire pour valider les conséquences
1. Déterminer les scénarios / conditions nécessaires au déclenchement d'une action 

#### Envisager TOUS les cas possibles

La meilleure manière de procéder est, si possible, de faire des tableaux façon Excel avec :

- chaque ligne étant la description d'un scénario / cas de la vie possible
- une colonne sert à décrire les conditions du scénario
- une autre colonne sert à décrire les conséquences (et les vérifications associées)

### La forme

Il existe plein d'excellentes ressources sur le web ou sur étagères expliquant les différents types de formats (EPIC, UC, US, CA, etc.) de spec considérés agiles.

Pour ma part, je suis partisan du combo User Story (plutôt que Use Case) et Critères d'Acceptation associés à chaque story, dans un Wiki plutôt que dans un fichier Word, Excel ou PPT, écrit en langage métier naturel plutôt qu'en terme d'interfaces utilisateur.

#### User Story

Je ne serai pas original sur ce point. Je m'en tiens au traditionnel formalisme :

- **En tant que** &lt;Acteur&gt;
- **Je veux** &lt;Action&gt;
- **Afin de** &lt;Gain&gt;

Par ailleurs, je considère les US à travers le prisme de l'approche 3C :

- **Card** : une story doit pouvoir être écrite de manière lisible sur une carte
- **Critères** : des critères d'acceptation doivent être définis, afin de valider la story
- **Communication** : une US n'est pas une spécification détaillée exhaustive qui se suffit à elle-même ; c'est une base de discussion entre les sachants et les exécutants

Enfin, je fais en sorte que les stories qui émergent valident les critères INVEST :

- **I**ndependant
- **N**egotiable
- **V**aluable
- **E**stimable
- **S**mall
- **T**estable

#### Critère d'Acceptation

En tant que développeur j'aime que les CA soient rédigés suivant le formalisme *// Given // When // Then*. Il y a un côté "approche scientifique" très structurée qui s'accomode bien avec ma façon de pensée.

Cependant, une récente expérience d'accompagnement agile m'a fait me rendre compte que ce formalisme n'est pas facile à apprivoisier, en particulier pour des personnes qui ne sont ni développeurs, ni habituées à faire des tests.

Mon client évoluant dans un contexte franco-français, j'ai tenté de traduire une première fois dans la langue de Molière (// Etant donné que // Quand // Alors) sans plus de réussite. 

J'ai tenté une seconde traduction -- // Conditions // Action // Vérifications -- qui s'est avérée plus concluante.

Malgré cela, et après 2 jours, on sentait que le formalisme n'était pas encore tout à fait compris ou adopté. Au point finalement, de leur proposer d'écrire leurs CA comme ils le comprennent le mieux, en se concentrant toutefois sur l'action et les vérifications (l'identification des conditions devenant à la charge du développeur).

#### Un exemple de CA

<pre><code><strong>Etant donné que</strong> je dispose d'un compte utilisateur
<strong>Et que</strong> mon compte est actif

<strong>Quand</strong> je saisi mes identifiants
<strong>Et que</strong> je me connecte

<strong>Alors</strong> le système m'autentifie
<strong>Et</strong> j'arrive sur mon tableau de bord
</code></pre>

#### Quel media ?

Je préconise l'usage d'un **Wiki**.

L'avantage d'un Wiki est de centraliser l'information dans un référentiel partagé et accessible, tout en offrant des fonctionnalités avancées d'historisation et de navigation (par rapport à un fichier Word de 300 pages, par exemple).

Un Wiki valide les critères CLEAN :

- **C**ompréhensible
- **L**isible
- **E**xacte
- **A**ccessible
- **N**avigable

Encore une fois, le meilleur format est celui qui vous permet de mener vite et bien le développement de fonctionnalités 


