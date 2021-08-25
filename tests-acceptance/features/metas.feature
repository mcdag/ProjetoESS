Feature: As a professor
         I want to register, remove and edit students metas
         So that I can manage their learning goals 
         So that I can manage their learning goals

Scenario: Adicionando uma meta nova
Given Eu estou na pagina de metas
Given Eu nao vejo uma meta com o nome "Requisitos"
When Eu tento adicionar a meta "Requisitos"
Then Eu consigo ver a meta "Requisitos" na lista de metas 

Scenario: Adicionando uma meta que ja existe
Given Eu estou na pagina de metas
Given Eu vejo uma meta com o nome "Requisitos"
When Eu tento adicionar a meta "Requisitos"
Then Eu consigo ver uma mensagem de erro