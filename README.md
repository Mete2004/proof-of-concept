Ontwerp en maak een data driven online concept voor een opdrachtgever

De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)

# Titel
<!-- Geef je project een titel en schrijf in één zin wat het is -->
### Decathlon

Een Product Detail Page (PDP) waarop gebruikers productinformatie, afbeeldingen en reviews kunnen bekijken en zelf reviews kunnen plaatsen.

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->
Voor dit project heb ik een Product Detail Page (PDP) ontwikkeld waarop gebruikers productinformatie kunnen bekijken. Ik heb een interactieve carousel ontworpen waarmee gebruikers door meerdere productafbeeldingen kunnen navigeren. Daarnaast heb ik een reviewfunctionaliteit gerealiseerd als onderdeel van User Generated Content (UGC), waarbij gebruikers via een formulier zelf reviews kunnen plaatsen en bestaande reviews kunnen bekijken.

### Carousel 
<img width="232" height="370 " alt="image" src="https://github.com/user-attachments/assets/cd6ba850-a373-4ec9-9900-cc7361d9c7c5" />

https://github.com/user-attachments/assets/07d8a6aa-965d-42b0-8b2f-72f5cda67fc0

### Review-form
<img width="232" height="370" alt="image" src="https://github.com/user-attachments/assets/be8bc30b-ce3f-4482-87e7-4e32453c0a9c" />
<br>
<img width="232" height="370" alt="image" src="https://github.com/user-attachments/assets/2bcc4640-7926-4937-98e1-9ca3ad2f4970" />


## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->

### Product Carousel

De Product Carousel maakt het mogelijk om door meerdere productafbeeldingen te navigeren. Gebruikers kunnen afbeeldingen bekijken door op een thumbnail te klikken of door de vorige- en volgende-knoppen te gebruiken.

### Review Functionaliteit (UGC)

Gebruikers kunnen zelf reviews toevoegen via een formulier. Ingevoerde reviews worden opgeslagen en vervolgens weergegeven op de Product Detail Page.

Om de gebruikerservaring verder te verbeteren verschijnt tijdens het verzenden een loading state op de verzendknop. Na een succesvolle verzending wordt een success state getoond.

<img width="1731" height="637" alt="image" src="https://github.com/user-attachments/assets/5f0a6a4e-db75-4b41-9a16-f08f106fb941" />

### Progressive Enhancement 

Bij dit project heb ik functionaliteiten stapsgewijs opgebouwd volgens het principe van Progressive Enhancement. Hierdoor blijft de website bruikbaar voor alle gebruikers, terwijl browsers met extra ondersteuning een rijkere ervaring krijgen.

#### Product Carousel

De basis van de carousel werkt zonder JavaScript. Gebruikers kunnen productafbeeldingen bekijken via de standaard afbeelding en de lijst met thumbnails.

Met JavaScript wordt de gebruikservaring verbeterd door gebruikers afbeeldingen te laten wisselen via thumbnails en de vorige- en volgende-knoppen. De actieve afbeelding wordt daarbij visueel gemarkeerd. 

Voor browsers die moderne technieken ondersteunen heb ik extra verbeteringen toegevoegd, zoals autoplay en vloeiende overgangen met de View Transition API. Hierdoor voelt het wisselen tussen afbeeldingen natuurlijker en prettiger aan.

### Review Functionaliteit (UGC)

De reviewfunctionaliteit begint met een standaard HTML-formulier waarmee gebruikers een review kunnen versturen. Dankzij HTML-validatie blijven verplichte velden ook zonder JavaScript gecontroleerd.

Met JavaScript wordt het formulier vervolgens uitgebreid met extra gebruiksgemak. Gebruikers krijgen directe feedback via inline validatie, een character counter en duidelijke loading- en success states tijdens het verzenden van een review.

Voor de loading state wordt met @supports gecontroleerd of de browser de benodigde CSS-functionaliteiten ondersteunt. Wanneer dit zo is, wordt een geanimeerde loader getoond. Anders wordt teruggevallen op een eenvoudige tekstuele melding ("Loading..."), zodat gebruikers altijd feedback krijgen tijdens het verzenden.

### User Preferences

Naast Progressive Enhancement heb ik rekening gehouden met gebruikersvoorkeuren door de prefers-reduced-motion media query toe te passen. Gebruikers die in hun besturingssysteem hebben aangegeven minder animaties te willen zien, krijgen een versie van de website zonder de geanimeerde marquee in de footer. Hierdoor wordt de website toegankelijker voor gebruikers die gevoelig zijn voor bewegende elementen.

``@media (prefers-reduced-motion: reduce) {
    .benefits-list {
        animation: none;
    }
}``

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
