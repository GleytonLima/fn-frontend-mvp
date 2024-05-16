# Anotações

## Classe Stock:

Manter a classe Stock para representar o estoque de cada recurso, com atributos como resourceId, quantity e location (para indicar onde o recurso está armazenado).

## Classe Resource:

Manter a classe Resource para representar os tipos de recursos, com atributos como resourceId, type e otherDetails.

## Classe ResourceRequest:

Criar uma nova classe ResourceRequest para representar as solicitações de recursos feitas pelas missões.

Atributos: requestId, mission, resource, quantityRequested, status (aprovado, pendente, rejeitado).

## Classe ResourceShipment:

Criar uma nova classe ResourceShipment para representar os envios de recursos do estoque para as missões.

## Atributos:

shipmentId, resourceRequest, stock, quantityShipped, shipmentDate.

# Fluxo de controle de estoque:

Solicitação de recursos: A missão cria um objeto ResourceRequest para cada recurso necessário, especificando a quantidade.

Aprovação da solicitação: As solicitações são avaliadas e aprovadas/rejeitadas.

Criação do envio: Para cada solicitação aprovada, é criado um objeto ResourceShipment, associando a solicitação ao estoque de origem e à quantidade enviada.

Atualização do estoque: A quantidade do recurso no estoque de origem é diminuída.

Recebimento na missão: A missão recebe os recursos e registra a entrada.

Devolução (opcional): Recursos não utilizados podem ser devolvidos, gerando um novo ResourceShipment para atualizar o estoque.
