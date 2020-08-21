# Projet-3-OCR

Développer une page de type "Single page Application" simulant la réservation de vélos dans une ville. Ces vélos sont répartis dans de nombreuses stations dans la ville. L'utilisateur doit pouvoir réserver un vélo depuis son navigateur (à condition qu'il reste des vélos disponibles à la station !). La réservation est alors temporairement enregistrée sur le navigateur du visiteur.

Les données doivent provenir de l'API temps réel.

Il doit être possible de réserver un vélo disponible à la station sélectionnée en :

1°) Indiquant son nom et son prénom,
2°) Signant dans un champ libre implémenté à l’aide de l’API HTML5 Canvas.

Vous devez écrire vous même le code du Canvas. Aucun plugin n’est autorisé.

Les données de réservation seront stockées dans le navigateur à l’aide de l’API Web Storage et affichées en dessous du panneau. L'état de la réservation (s’il y en a une) est ainsi affiché, avec un décompte dynamique du temps restant avant expiration de la réservation.

Une réservation expire automatiquement au bout de 20 minutes et également lorsque le navigateur web se referme.

Le nom et le prénom sont toutefois conservés par le navigateur pour préremplir le formulaire de réservation lors d'un prochain usage, même si le navigateur a été fermé.
