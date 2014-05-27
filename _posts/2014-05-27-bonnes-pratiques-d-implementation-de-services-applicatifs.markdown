---
layout: post
title: Bonnes pratiques d'implémentation de services applicatifs
disqus: true
date: 2014-05-27 13:08:00
excerpt: Les architectures à base de services sont depuis longtemps monnaies courantes. Avec l'avènement du Web et la montée en puissance des architectures REST et/ou orientées micro-services, i.e. les WOA (Web Oriented Architectures), les services applicatifs ont de beaux jours devant eux.Une difficulté, quand on écrit de tels composants, est de définir une stratégie Orientée Objet à la fois simple, cohérente et applicable à tous les services applicatifs de notre logiciel. Je vous livre ci-dessous les bonnes pratiques que j'applique quand je dois concevoir et développer ce type de composants (services ESB/EAI, WS SOAP/XML, Resources REST, etc.).
---
Les architectures à base de services sont depuis longtemps monnaies courantes. Avec l'avènement du Web et la montée en puissance des architectures REST et/ou orientées micro-services, i.e. les WOA (Web Oriented Architectures) ou même du DDD (et sa couche "application"), les services applicatifs ont de beaux jours devant eux.

Une difficulté, quand on écrit de tels composants, est de définir une stratégie Orientée Objet à la fois simple, cohérente et applicable à tous les services applicatifs de notre logiciel.

Je vous livre ci-dessous les bonnes pratiques que j'applique quand je dois concevoir et développer ce type de composants (services ESB/EAI, WS SOAP/XML, Resources REST, etc.).

## Le pattern Request / Resource / Response

Dans les premiers temps du développement de services applicatifs voués à être consommés par d'autres systèmes ou composants logiciels (ex : UI, WS d'un partenaire, autres jobs/agents internes), on a plutôt tendance à se concentrer sur les informations qui transitent (arguments en entrée et valeurs de retour) plutôt que sur la façon dont on les reçoit / transmet. On cherche à vérifier la mécanisque et sa configuration, tout en privilégiant une productivité élevée, sans fioriture, *straight-to-the-point*. 

Puis vient un moment où l'on en vient à s'interroger sur la gestion des erreurs. De même, à partir d'un certain stade la quantité d'arguments à gérer devient problématique.

C'est à ce moment là qu'apparaît généralement le pattern Request / Resource / Response. Autrement dit, pour un service donnée (ex : effectuer une recherche de produit), on va faire appel à 2 classes et la méthode-service.

{% highlight java %}
/** ProductSearchRequest.java */
public class ProductSearchRequest {

  private String expression;
  private int offset;
  private int number;
  
  ...

}
{% endhighlight %}

{% highlight java %}
/** ProductSearchResponse.java */
public class ProductSearchResponse {
  
  private List<ProductDto> results = new ArrayList();
  private List<String> errors = new ArrayList();
  
  ...

}
{% endhighlight %}

{% highlight java %}
/** ProductResource.java */
public interface ProductResource {
  
  ProductSearchResponse search(ProductSearchRequest request);

  ...
}
{% endhighlight %}

L'inconvénient de cette façon de faire est le nombre de classes à écrire nécessaires pour un service. C'est le prix à payer pour assurer un découpage en couche solide et de qualité.

## Responsabilités Orientées Objet

Une des plus grandes difficultés (pour moi, LA plus grande) dans la conception Orientée Objet est l'attribution des responsabilités pour une classe ou type de classe. Avec le temps et après avoir tenté plusieurs stratégies, je limite désormais mes services applicatifs aux 4 attributions suivantes :

- Contrôler les paramètres passés en requête
- Assurer la transformation Objects de Transfert - Objets du Domaine
- Ordonnancer le(s) service(s) métier (et gérer les erreurs remontées)
- Construire et retourner une réponse valide

### 1/ Contrôler les paramètres passés en requête

Un service applicatif (qu'il soit Web ou pas) représente un point d'entrée dans le Système (d'où l'emploi de la terminologie *endpoint* dans les frameworks dédiés). De fait, il représente une faille d'intrusion ou d'injection malicieuse potentielle. Il convient donc, à ce niveau, de se montrer particulièrement prudent (voire méfiant, ou même paranoïaque), **même quand le consommateur est un composant interne du SI de l'entreprise**.

Une autre raison de vérifier les paramètres est tout simplement que le consommateur peut en faire un mauvais usage, par méconnaissance ou incompréhension. Il ne faudrait pas qu'un mauvais appel, avec de mauvais arguments (ou sans des paramètres requis) mettent l'application dans un étât instable ou incohérent.

Pour ces deux raisons, il convient systématiquement de vérifier, en début de chaque service, la **validité technique** des arguments de la requête. 

On parle ici de contrôler par exemple l'existence et/ou le type d'un champs, comme dans l'exemple ci-dessous. Il ne s'agit pas d'effectuer de contrôle fonctionnel, relatifs aux valeurs des arguments, mais plutôt des contrôles sur le format des données en entrées. Les contrôles métier seront assumés par les services du domaine / métier dont c'est l'une des responsabilités.

{% highlight java %}
/** ProductResourceImpl.java */
public class ProductResourceImpl implements ProductResource {
  
  public ProductSearchResponse search(ProductSearchRequest request) {
    ProductSearchResponse response = new ProductSearchResponse();
    
    // 1. Check Request Object
    if (!checkRequest(request, response)) {
      return response;
    }
    
    ...
    
  }
  
  private boolean checkRequest(ProductSearchRequest request, ProductSearchResponse response) {
    if (request == null) {
      reponse.putError("The request received was null");
      return false;
    }
    if (request.getExpression() == null || request.getExpression().isEmpty()) {
      reponse.putError("Search expression is required");
      return false;
    }
    ...
    return true;
  }

}
{% endhighlight %}

### 2/ Assurer la transformation Objects de Transfert - Objets du Domaine

Un pattern que l'on retrouve souvent en programmation de services applicatifs est l'emploi de DTO (Data Transfer Objects). Ces objects sont généralement des classes de style POJO, avec extrèmement peu de comportement (le max étant généralement des capacités de pagination pour des DTO ayant trait à de la recherche).

Quand c'est le cas, alors il devient de la responsabilité de la couche applicative de convertir les DTO contenus dans l'objet Request en objets exploitables par la couche métier (les différents *Building Blocks* de DDD, i.e. Domain Entities, Value Objects, Agreggates and Roots, ou tout simplement les Entités JPA associées).

Evidemment le service doit aussi assurer la transformation inverse si nécessaire, depuis les objets métier vers les objets de transfert.

On peut s'appuyer sur des patterns tels que Factory Method ou Builder pour réaliser les transformations.

Ou alors utiliser des frameworks tels que [Dozer](http://dozer.sourceforge.net/ "Dozer"), [Objenesis](https://code.google.com/p/objenesis/ "Objenesis"), ou [Orika](https://code.google.com/p/orika/ "Orika") en Java.

Finalement, on peut aussi très bien le faire à la main si le mapping est simple, comme dans l'exemple ci-desous :

{% highlight java %}
/** ProductResourceImpl.java */
public class ProductResourceImpl implements ProductResource {

  public ProductSearchResponse search(ProductSearchRequest request) {
    
    ...
    
    // 2. a) Convert Request DTO to Domain Entity
    ProductSearchCriteria criteria = convert(request);
    
    ...
    
  }
  
  private ProductSearchCriteria convert(ProductSearchRequest request) {
    ProductSearchCriteria criteria = new ProductSearchCriteria();
    criteria.setExpression(request.getExpression());
    criteria.setOffset(request.getOffset());
    criteria.setNumRows(request.getNumber());
    return criteria;
  }

}
{% endhighlight %}

### 3/ Ordonnancer le(s) service(s) métier (et gérer les erreurs remontées)

Une fois qu'on s'est assuré que la requête reçue est bien formée et qu'on l'a convertie en objet(s) exploitable(s), on peut enfin appeler le ou les service(s) métiers en charge de la logique fonctionnelle de l'application, **dans le bon ordre**.

Il s'agit là de la seule intelligence véritable de la couche applicative. Et encore, la plupart du temps, les services applicatifs sont des passe-plat vers un unique service business sous-jacent.

Dans notre exemple, une fois que la recherche a eu lieue, on veut l'historiser (pour des raisons légales, ou pour améliorer la connaissance de sa base utilisateurs) dans un log. On veut aussi intercepter les erreurs, si le service de recherche en renvoie, pour pouvoir les remonter à l'utilisateur.

{% highlight java %}
/** ProductResourceImpl.java */
public class ProductResourceImpl implements ProductResource {

  public ProductSearchResponse search(ProductSearchRequest request) {
    
    ...
    
    // 3. Call ordered business services
    List<Product> products = null;
    try {
      // a) Do search
      products = productService.find(criteria);
      if (products == null || products.isEmpty()) {
        response.putError("No product found");
      }
      response.setResults(products);
    } catch (DomainException de) {
        response.putError("An erreur occured during search");
    } finally {
      // b) Log search
      historyService.addEntry(criteria, products);
    }
    
    ...
  }
  
}
{% endhighlight %}

### 4/ Construire et retourner une réponse valide

Si besoin, il peut être utile ou nécessaire à ce stade d'exécuter un second jeu de vérifications, histoire de garantir que ce qui sort du système est fiable, sécurisé, optimisé, etc. Le but est de renvoyer un objet réponse exploitable par TOUS les consommateurs du service.

{% highlight java %}
/** ProductResourceImpl.java */
public class ProductResourceImpl implements ProductResource {

  public ProductSearchResponse search(ProductSearchRequest request) {
    
    ...
    
    // 2. b) 
    reponse.setResults(convert(products));
    
    // 4. 
    a) Verify reponse
    if (!checkResponse(response)) {
      throw new ApplicationException();
    }
    
    // b)
    return response;
  }
  
  ...
  
  /** Convert a list of Product entities into a list of Product DTO */
  private List<ProductDto> convert(List<Product> products) {
    ...
  }
  
  /** Verify if the built response if valid */
  private boolean checkResponse(ProductSearchResponse response) {
    ...
  }
  
}
{% endhighlight %}

## Le pattern Summary/Detail

L'un des avantages d'une couche de services applicatifs est la rationalisation des services exposés. Une difficulté qui peut apparaître est lorsque les systèmes consommateurs ont des contraintes (performances / bande passante) ou des usages de données très différents, ou inconciliable.

C'est le cas par exemple des applications mobiles. Quand un utilisateur navigue sur Internet depuis une station Desktop, il privilégiera davantage la richesse du contenu et des interactions. Quand il accède à la même application depuis un terminal mobile, il aura tendance à être plus attentif aux temps de réponse (affichage, traitements et comportements) et à la qualité de la lecture et de la navigation.

Une approche efficace est l'utilisation du pattern Summary/Detail qui consiste à définir le DTO retourné comme un agrégat de plusieurs "sections de données" :

- *Summary* : contient les informations principalesvouées à être consommées et utilisées par tous les clients
- *Detail* : contient des informations lourdes ou complémentaires, utilisées par les clients qui en ont les moyens (ex: Desktop)

Si besoin, il est envisageable de définir d'autres sections pour avoir un découpage encore plus fin (ex : Desktop, Tablet, SmartPhone). On peut par exemple considérer le découpage suivant : IdentityDto, SummaryDto, DetailDto.

{% highlight java %}
/** ProductDto.java */
public class ProductDto {

  private ProductSummaryDto summary;
  private ProductDetailDto detail;
  
  ...

  public class ProductSummaryDto {
  
    private Long id;
    private String title;
    private String self;
    
    ...
  }
  
  public class ProductDetailDto {
  
    private byte[] image;
    private String description;
    private SocialDataDto socialData;
    // Etc.
    
    ...
  }

}
{% endhighlight %}

{% highlight java %}
/** ProductSearchRequest.java */
public class ProductSearchRequest {

  private String expression;
  private int offset;
  private int number;
  
  // Flag used to tell if we ask for a complete ProductDto, or only for its summary.
  private boolean detailRequired = false;
  
  ...

}
{% endhighlight %}

{% highlight java %}
/** ProductResourceImpl.java */
public class ProductResourceImpl implements ProductResource {

  public ProductSearchResponse search(ProductSearchRequest request) {
    
    ...
    
    reponse.setResults(convert(products));
    
    ...
  }
  
  // Change conversion methods in order to take into account Summary/Detail pattern 
  private List<ProductDto> convert(List<Product> products, boolean detailRequired) {
    List<ProductDto> results = new ArrayList<>();
    for (Product entity : products) {
      ProductDto product = new ProductDto();
      product.summary = convert(entity);
      if (detailRequired) {
        product.detail = convert(entity);
      }
      results.add(product);
    }
    return results;
  }
  
  // Build a ProductSummaryDto from a Product entity
  private ProductSummaryDto convert(Product product) {
    ...
  }
  
  // Build a ProductDetailDto from a Product entity
  private ProductDetailDto convert(Product product) {
    ...
  }
  
}
{% endhighlight %}



