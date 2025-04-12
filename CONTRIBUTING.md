# Guide de contribution

Merci de votre intérêt pour contribuer au projet Minecraft Wiki Toolkit ! Voici quelques directives pour faciliter le processus de contribution.

## Code de conduite

- Soyez respectueux envers les autres contributeurs
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est le mieux pour la communauté
- Faites preuve d'empathie envers les autres membres

## Comment contribuer

### Signaler des bugs

1. Utilisez le tracker d'issues de GitHub
2. Vérifiez que le bug n'a pas déjà été signalé
3. Utilisez le template de bug report
4. Incluez autant de détails que possible

### Proposer des fonctionnalités

1. Ouvrez une issue avec le label "enhancement"
2. Décrivez clairement la fonctionnalité et son intérêt
3. Discutez de l'implémentation avec l'équipe

### Processus de pull request

1. Fork du projet
2. Création d'une branche (`git checkout -b feature/amazing-feature`)
3. Commit de vos changements (`git commit -m 'Ajout d'une fonctionnalité incroyable'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouverture d'une Pull Request

### Standards de code

- Suivez les conventions de style existantes
- Écrivez des tests pour vos fonctionnalités
- Documentez le nouveau code
- Assurez-vous que tous les tests passent

## Structure des branches

- `main` - Branche principale, code de production
- `develop` - Branche de développement
- `feature/*` - Branches de fonctionnalités
- `bugfix/*` - Branches de corrections de bugs
- `release/*` - Branches de préparation de release

## Processus de release

1. Fusion des fonctionnalités dans `develop`
2. Création d'une branche `release/x.y.z`
3. Tests et corrections finales
4. Fusion dans `main` et tag de version
5. Mise à jour du changelog

## Documentation

Tout nouveau code doit être accompagné d'une documentation complète :

- Fonctions et classes commentées
- Exemples d'utilisation
- Mise à jour des README si nécessaire

## Questions ?

Si vous avez des questions sur le processus de contribution, n'hésitez pas à ouvrir une issue avec le label "question".
