Feature: As a professor
         I want to see colorful students concepts
         So that I can manage their learning goals

Scenario: Seeing MANA as red
Given I am at the metas page
Given I see a student with CPF "683" in the students list
Given I see the student with CPF "683" has meta "math"
When I select "MANA" to "math" for the student with CPF "683" 
Then I can see "MANA" background in "red"