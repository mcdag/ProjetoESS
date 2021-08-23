Feature: As a professor
         I want to register, remove and edit students metas
         So that I can manage their learning goals

Scenario: Adicionando uma meta nova
Given Eu estou na pagina de metas
Given Eu nao vejo uma meta com o nome "Requsitos"
When Eu tento adicionar a meta "Requisitos"
Then Eu consigo ver a meta "Requisitos" na lista de metas

Scenario: Atualizando uma meta
Given Eu estou na pagina de metas
Given Eu consigo ver a meta "Requisitos" na lista de metas
When Eu tento mudar o nome da meta "Requisitos" para "Refatoracao"
Then Eu nao consigo ver a meta "Requisitos" na lista de metas
Then Eu consigo ver a meta "Refatoracao" na lista de metas