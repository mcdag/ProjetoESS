Feature: As a professor
         I want to register, remove and edit students metas
         So that I can manage their learning goals

Scenario: Adicionando uma meta
Given Eu estou na pagina de metas
Given Eu nao vejo uma meta com o nome "Requisitos"
When Eu tento adicionar a meta "Requisitos"
Then Eu consigo ver a meta "Requisitos" na lista de metas

Scenario: Adicionando uma meta que ja existe
Given Eu estou na pagina de metas
Given Eu vejo uma meta com o nome "Requisitos"
When Eu tento adicionar a meta "Requisitos"
Then Eu consigo ver uma mensagem de erro

Scenario: Atualizando uma meta
Given Eu estou na pagina de metas
Given Eu vejo uma meta com o nome "Requisitos"
When Eu tento mudar o nome da meta "Requisitos" para "Refatoracao"
Then Eu nao consigo ver a meta "Requisitos" na lista de metas

#Scenario: Removendo uma meta
#Given Eu estou na pagina de metas
#Given Eu vejo uma meta com o nome "Caligrafia"
#When Eu tento remover a meta "Caligrafia"
#Then Eu nao consigo ver a meta "Caligrafia" na lista de metas
