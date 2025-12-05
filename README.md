# 🟦 jkicons
Librería oficial de iconos SVG creados por **José Támara**.  
Compatible con **React**, **Next.js**, **Vue**, **Svelte**, **Angular** y **vanilla JS**.

## 🚀 Instalación

```bash
npm install @jkzasori/jkicons
```

## 📖 Uso en diferentes frameworks

### ⚛️ React

```tsx
import { Facebook, Instagram, ArrowLeft } from "@jkzasori/jkicons";

export default function App() {
  return (
    <div>
      <Facebook size={32} color="#4267B2" />
      <Instagram size={32} color="#E4405F" />
      <ArrowLeft size={24} color="currentColor" className="my-icon" />
    </div>
  );
}
```

### ⚡ Next.js

```tsx
// app/page.tsx o pages/index.tsx
import { Facebook, Instagram } from "@jkzasori/jkicons";

export default function Home() {
  return (
    <main>
      <Facebook size={40} color="#1877f2" />
      <Instagram size={40} color="#e4405f" />
    </main>
  );
}
```

### 🟢 Vue 3

```vue
<template>
  <div>
    <Facebook :size="32" color="#4267B2" />
    <Instagram :size="32" color="#E4405F" />
  </div>
</template>

<script setup>
import { Facebook, Instagram } from "@jkzasori/jkicons";
</script>
```

### 🔶 Svelte

```svelte
<script>
  import { Facebook, Instagram } from "@jkzasori/jkicons";
</script>

<div>
  <Facebook size={32} color="#4267B2" />
  <Instagram size={32} color="#E4405F" />
</div>
```

### 🅰️ Angular

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { Facebook, Instagram } from '@jkzasori/jkicons';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <Facebook [size]="32" color="#4267B2" />
      <Instagram [size]="32" color="#E4405F" />
    </div>
  `,
  standalone: true
})
export class AppComponent {}
```

### 📄 Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>jkicons Example</title>
</head>
<body>
  <div id="app"></div>

  <script type="module">
    import { Facebook, Instagram } from '@jkzasori/jkicons';
    import { createElement } from 'react';
    import { createRoot } from 'react-dom/client';

    const app = document.getElementById('app');
    const root = createRoot(app);

    root.render(
      createElement('div', null,
        createElement(Facebook, { size: 32, color: '#4267B2' }),
        createElement(Instagram, { size: 32, color: '#E4405F' })
      )
    );
  </script>
</body>
</html>
```

### 🎨 Usando SVG directamente

Si prefieres usar los SVG sin React, puedes importarlos desde la carpeta `icons`:

```javascript
// Con bundler (Webpack, Vite, etc.)
import facebookSvg from '@jkzasori/jkicons/icons/social/facebook.svg';

// Usar en tu HTML
document.getElementById('my-icon').innerHTML = facebookSvg;
```

## 🎯 Props disponibles

Todos los componentes de iconos aceptan las siguientes props:

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `size` | `number` | `24` | Tamaño del icono en píxeles |
| `color` | `string` | `"currentColor"` | Color del icono (cualquier valor CSS válido) |
| `className` | `string` | `""` | Clases CSS adicionales |
| `style` | `object` | `{}` | Estilos inline personalizados |
| `strokeWidth` | `number` | `2` | Grosor del trazo (solo algunos iconos) |

### Ejemplo con todas las props:

```tsx
<Facebook
  size={48}
  color="#1877f2"
  className="icon-facebook hover:opacity-80"
  style={{ margin: '10px' }}
/>
```

## 📂 Categorías disponibles

Los iconos están organizados en 6 categorías con un total de 79 iconos:

### 🔗 Social (2 iconos)
Redes sociales y plataformas de comunicación
- Facebook, Instagram

### ➡️ Arrows (7 iconos)
Flechas, direccionales y navegación
- ArrowLeft, ArrowRight, Chevron, ChevronUp, ChevronDown, Download, CloseXDropdown

### 🎨 UI (14 iconos)
Elementos de interfaz de usuario
- User, Search, Edit, Trash, Check, CircleCheck, CirclePlus, CartActive, CancelCircle, CheckSingle, CloseCircle, y más

### 💼 Business (8 iconos)
Herramientas de negocio y gestión
- Comanda, Print, Asignar, Dashboard, Monitor, Chart, ChartPie, HourglassScheduled

### 🛒 Commerce (3 iconos)
Comercio electrónico y pagos
- Store, StoreCode, PaymentMethod

### 📦 Others (46 iconos)
Iconos diversos para múltiples propósitos
- Calendar, Phone, Mail, Location, Security, Timer, Chat, Evidence, y más

```tsx
// Importar por categoría
import { Facebook, Instagram } from "@jkzasori/jkicons"; // social
import { Chevron, ChevronDown, ArrowRight } from "@jkzasori/jkicons"; // arrows
import { User, Search, Trash } from "@jkzasori/jkicons"; // ui
import { Dashboard, Chart, Monitor } from "@jkzasori/jkicons"; // business
import { Store, PaymentMethod } from "@jkzasori/jkicons"; // commerce
```

## 🛠 CLI para crear un icono

```bash
jkicon facebook social
```

## 📦 Build
```
npm run build
```

## 📚 Documentación
```
npm run docs:dev
```
