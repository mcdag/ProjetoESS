import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameMeta =  ((elem, meta) => elem.getAttribute('value').then(text => text === meta));

async function criarMeta(meta) {
    await $("input[name='novaMeta']").sendKeys(<string> meta);
    await element(by.buttonText('Adicionar')).click();
}

async function criarNota(cpf, meta, nota) {
    element(by.className(cpf+meta+nota)).click();
}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertElementsWithSameMeta(n,meta) {
    var allmetas : ElementArrayFinder = element.all(by.name('inputmeta'));
    var samemetas = allmetas.filter(elem => sameMeta(elem,meta));
    await assertTamanhoEqual(samemetas,n); 
}

async function assertElementsWithSameColor(n, meta, cpf, color) { 
    var elem = element(by.id(cpf+meta))
    await elem.getCssValue('background-color').then(value => value === color);
}

async function assertElementsWithSameCPF(n,cpf) {
    var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
    var samecpfs = allalunos.filter(elem => sameCPF(elem,cpf));
    await assertTamanhoEqual(samecpfs,n); 
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the metas page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
    })
     
    Given(/^I see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
        await assertElementsWithSameCPF(1,cpf); 
    });

    Given(/^I see the student with CPF "(\d*)" has meta "([^\"]*)"$/, async (cpf, meta) => {
        await criarMeta(meta);
        await assertElementsWithSameMeta(1, meta); 
    });
    When(/^I select "([^\"]*)" to "([^\"]*)" for the student with CPF "(\d*)"$/, async (nota, meta, cpf) => {
        await criarNota(cpf, meta, nota);       
    });

    Then(/^I can see the grade to "([^\"]*)" for the student with CPF "(\d*)" background in "([^\"]*)"$/, async (meta, cpf, color) => {
        await assertElementsWithSameColor(1,meta, cpf, color);
    });
    
})
