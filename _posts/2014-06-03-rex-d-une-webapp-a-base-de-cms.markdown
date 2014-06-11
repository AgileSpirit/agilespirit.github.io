---
layout: post
title:  "Retour d'expérience d'un projet agile douloureux"
date:   2014-06-03 00:00:00
published: false
excerpt: TODO
disqus: false
---

Il y a quelques années, j'ai participé à la refonte d'une plateforme (multi-sites, multi-produits, et multi-national) de présentation de produits financiers pour une banque. Si le projet a bien débuté (de bonnes premières démos, une confiance forte du client, une sensation de "facilité"), il est petit-à-petit devenu compliqué, voire ingérable après la mise en Production. Tant et si bien que l'Equipe a été remerciée -- à notre grand soulagement -- et le projet confié à une autre SSII.

Aujourd'hui, je considère ce projet comme une demi-réussite : nous sommes parvenus à développer et déployer plusieurs sites publics dans plusieurs pays ; mais ce fut au prix de nombreux, longs et coûteux efforts (pour l'Equipe, notre SSI, le client) et d'une qualité finale plus que moyenne, que nous avons vécu comme une frustration, un sentiment de gaspillage à l'origine de la démotivation (puis de l'éviction) de l'Equipe.


# Title H1

## Title H2

### Title H3

#### Title 4

This is a default text

*This is an italic text*

**This is a bold text**

`This is an inlined text`

~~This is a strikethroughed text~~

[This is a link](http://agilespirit.github.io)

> This is a blockquote text

<!-- This is a comment text (not visible in the rendered page) -->

Following is an unordered list (blank line is required) :

* item 1
	* subitem a
	* subitem b
	* subitem c
* item 2
* item 3

Following is an ordered list (blank line is required) :

1. item 1
	1. subitem a
	1. subitem b
	1. subitem c
1. item 2
1. item 3

Following is an image : ![Jekyll movie](/assets/img/jekyll.jpeg )

Following is a sample Java code snippet :

{% highlight java %}
public class Midfielder implements Player extends Infielder {

  private final int number;

  public Midfielder(final int number) {
    super();
    this.number = number;
  }

  public void shoot() {
    // Does some awesome stuff !
    Logger.getLogger(Midfielder.class).info("Player shooted !");
  }
}
{% endhighlight %}

