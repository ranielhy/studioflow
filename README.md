# StudioFlow

Plataforma SaaS para criação de templates e personalização de imagens, vídeos e documentos PDF.

## Módulos

### Studio

Responsável pela criação e edição de:

- Templates
- Slices
- Components
- Blocks

### Personalize

Permite que o usuário escolha um template publicado e personalize apenas os campos configurados como editáveis.

As alterações serão exibidas em tempo real.

## Tecnologias

- React
- TypeScript
- React RND
- Node.js
- PostgreSQL
- Docker
- Docker Compose
- GitHub Actions
- Testes automatizados



#!/bin/bash

API_URL="http://localhost:3333/api"

echo "Criando Template..."

TEMPLATE_RESPONSE=$(curl -s -X POST \
  "$API_URL/templates" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Template Promoção Instagram",
    "description": "Template de exemplo para testar StudioFlow",
    "mediaType": "IMAGE",
    "status": "DRAFT",
    "width": 1080,
    "height": 1080
  }')

echo "$TEMPLATE_RESPONSE"

TEMPLATE_ID=$(echo "$TEMPLATE_RESPONSE" | jq -r '.data.id')

echo "Template criado com ID: $TEMPLATE_ID"


echo "Criando Slice..."

SLICE_RESPONSE=$(curl -s -X POST \
  "$API_URL/templates/$TEMPLATE_ID/slices" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cena Principal",
    "position": 0,
    "duration": 10,
    "background": {
      "type": "COLOR",
      "value": "#111111"
    }
  }')

echo "$SLICE_RESPONSE"

SLICE_ID=$(echo "$SLICE_RESPONSE" | jq -r '.data.id')

echo "Slice criada com ID: $SLICE_ID"


echo "Criando componente de texto..."

TEXT_COMPONENT_RESPONSE=$(curl -s -X POST \
  "$API_URL/slices/$SLICE_ID/components" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Título Principal",
    "position": {
      "x": 140,
      "y": 120
    },
    "size": {
      "width": 800,
      "height": 120
    },
    "startTime": 0,
    "endTime": 10,
    "rotation": 0,
    "opacity": 100,
    "zIndex": 2,
    "visible": true,
    "locked": false,
    "editable": true,
    "block": {
      "type": "TEXT",
      "properties": {
        "text": "SUPER PROMOÇÃO",
        "fontFamily": "Roboto",
        "fontSize": 64,
        "color": "#FFFFFF"
      }
    }
  }')

echo "$TEXT_COMPONENT_RESPONSE"


echo "Criando componente de imagem..."

IMAGE_COMPONENT_RESPONSE=$(curl -s -X POST \
  "$API_URL/slices/$SLICE_ID/components" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Imagem do Produto",
    "position": {
      "x": 240,
      "y": 320
    },
    "size": {
      "width": 600,
      "height": 500
    },
    "startTime": 0,
    "endTime": 10,
    "rotation": 0,
    "opacity": 100,
    "zIndex": 1,
    "visible": true,
    "locked": false,
    "editable": true,
    "block": {
      "type": "IMAGE",
      "properties": {
        "src": "https://picsum.photos/600/500",
        "fit": "cover"
      }
    }
  }')

echo "$IMAGE_COMPONENT_RESPONSE"


echo "Criando componente de texto secundário..."

SUBTITLE_COMPONENT_RESPONSE=$(curl -s -X POST \
  "$API_URL/slices/$SLICE_ID/components" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Preço",
    "position": {
      "x": 290,
      "y": 880
    },
    "size": {
      "width": 500,
      "height": 100
    },
    "startTime": 0,
    "endTime": 10,
    "rotation": 0,
    "opacity": 100,
    "zIndex": 3,
    "visible": true,
    "locked": false,
    "editable": true,
    "block": {
      "type": "TEXT",
      "properties": {
        "text": "R$ 99,90",
        "fontFamily": "Roboto",
        "fontSize": 52,
        "color": "#FFD700"
      }
    }
  }')

echo "$SUBTITLE_COMPONENT_RESPONSE"

echo ""
echo "StudioFlow criado com sucesso."
echo "Template ID: $TEMPLATE_ID"
echo "Slice ID: $SLICE_ID"