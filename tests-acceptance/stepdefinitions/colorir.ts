import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameMeta = ((elem, meta) => elem.element(by.name('metalist')).getText().then(text => text === meta));
let sameNota = ((elem, nota) => elem.element.getText().then(text => text === nota));
let sameColor = ((elem, color) => elem.element(by.css('background-color')).getText().then(text => text === color));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

async function criarMeta(meta) {
    await $("input[name='metabox']").sendKeys(<string> meta);
    await element(by.buttonText('Adicionar')).click();
}

async function criarNota(cpf, meta, nota) {
    var optionNum = 0;
    if(nota == "MANA"){
        optionNum = 0;
    }else if(nota == "MPA"){
        optionNum = 1;
    }else{
        optionNum = 2;
    }
    element.all(by.name(cpf+'select'+meta))   
    .then(function(options){
      options[optionNum].click();
    });   
}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}


async function assertElementsWithSameCPFAndMeta(n,cpf,meta) { 
    var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
    var samecpfsandmeta = allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameMeta(elem,meta)));
    await assertTamanhoEqual(samecpfsandmeta,n);
}

async function assertElementsWithSameNotaAndColor(n, nota, color) { 
    var allmetas : ElementArrayFinder = element.all(by.class('nota'));
    var samenotasandcolor = allmetas.filter(elem => pAND(sameColor(elem,color),sameNota(elem,nota)));
    await assertTamanhoEqual(samenotasandcolor,n);
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
        await assertElementsWithSameCPFAndMeta(1,cpf, meta); 
    });
    When(/^I select "([^\"]*)" to "([^\"]*)" for the student with CPF "(\d*)"$/, async (nota, meta, cpf) => {
        await criarNota(cpf, meta, nota);       
    });
    
    Then(/^I can see "([^\"]*)" background in "([^\"]*)"$/, async (nota, color) => {
        await assertElementsWithSameNotaAndColor(1,nota, color);
    });
    
})
