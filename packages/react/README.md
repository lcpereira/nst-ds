# @lcpereira/nst-ds-react

Componentes React completos do Design System. Construído com shadcn/ui, Tailwind CSS e Radix UI.

## Instalação

```bash
yarn add @lcpereira/nst-ds-react
# ou
npm install @lcpereira/nst-ds-react
```

## Uso

```tsx
import { Button, Input, Card, Dialog } from '@lcpereira/nst-ds-react';
import '@lcpereira/nst-ds-react/styles';

function App() {
  return (
    <div>
      <Button variant="default" size="md">
        Clique aqui
      </Button>
      
      <Input type="text" placeholder="Digite algo..." />
      
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content</p>
        </CardContent>
      </Card>
      
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## Componentes Disponíveis

- `Button` - Botão com variantes
- `Input` - Campo de entrada
- `Card` - Card container
- `Dialog` - Modal/Dialog
- `Badge` - Badge/etiqueta
- `Skeleton` - Loading skeleton
- `Tabs` - Abas

## Integração com Tailwind

Os componentes usam tokens do `@lcpereira/nst-ds-foundation` via Tailwind. Certifique-se de importar o CSS do foundation:

```tsx
import '@lcpereira/nst-ds-foundation/dist/css/theme1.css';
import '@lcpereira/nst-ds-react/styles';
```

## Dark Mode

Adicione a classe `dark` ao elemento raiz para ativar o dark mode:

```tsx
document.documentElement.classList.add('dark');
```

