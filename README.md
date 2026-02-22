# 📄 Éditeur CV — Carole Jacquelin

Un éditeur de CV interactif basé sur le web, sans installation requise.  
Ouvre simplement `index.html` dans ton navigateur.

## ✨ Fonctionnalités

- **Édition en direct** — clique sur n'importe quel texte pour le modifier
- **Mode Déplacement** — glisse et repositionne tous les blocs librement
- **Poignées de redimensionnement** — élargis ou écarte les blocs en glissant
- **Photo de profil** — clique sur la photo pour la remplacer
- **Couleurs personnalisables** — change la couleur principale du CV
- **Export PDF** — génère un PDF A4 fidèle au design
- **Lettre de motivation** — page intégrée, éditable et déplaçable
- **Sauvegarde automatique** — le contenu est sauvegardé localement (localStorage)
- **Zoom** — ajuste la taille d'affichage sans affecter le rendu final

## 🚀 Utilisation

1. Clone ou télécharge ce dépôt
2. Ouvre `index.html` dans Chrome ou Firefox
3. Édite le contenu directement dans la page

## 📁 Structure des fichiers

```
cv-carole/
├── index.html          # Page principale (HTML + JS)
├── styles.css          # Styles principaux
├── pdf_modal.css       # Modal d'export PDF
├── photo.css           # Gestion de la photo de profil
├── footer.css          # Barre de pied de page
└── print_styles.css    # Styles d'impression
```

## 🎨 Design

- Palette de couleurs inspirée de la ville de Massy
- Police : [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)
- Format A4 210mm × 297mm
- Compatible impression et export PDF

## 🛠️ Technologies

- HTML5 / CSS3 / JavaScript vanilla
- Font Awesome 6.4 (icônes)
- html2pdf.js (export PDF)
