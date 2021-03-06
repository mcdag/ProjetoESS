import { assert } from 'console';
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

let mesmaMeta = ((elem, meta) => elem.getAttribute('value').then(text => text === meta));

async function criarMeta(nome) {
    await $("input[name='novaMeta']").clear();
    await $("input[name='novaMeta']").sendKeys(<string> nome);
    await element(by.buttonText('Adicionar')).click();
}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na pagina de metas$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='metas']").click();
    });

    Given('Eu nao vejo uma meta com o nome {stringInDoubleQuotes}', async (nome) => {
        var metas : ElementArrayFinder = element.all(by.name('inputmeta'));
        var iguais = metas.filter(elem => mesmaMeta(elem,nome));
        await assertTamanhoEqual(iguais,0);
    });

    Given('Eu vejo uma meta com o nome {stringInDoubleQuotes}', async (nome) => {
        var metas : ElementArrayFinder = element.all(by.name('inputmeta'));
        var iguais = metas.filter(elem => mesmaMeta(elem,nome));
        await assertTamanhoEqual(iguais,1);
    });

    When(/^Eu tento adicionar a meta "([^\"]*)"$/, async (nome) => {
        await criarMeta(nome);
    });

    Then('Eu consigo ver uma mensagem de erro', async () =>{
        var allmsgs : ElementArrayFinder = element.all(by.name('msgmetaexistente'));
        await assertTamanhoEqual(allmsgs,1);
    });

    Then('Eu consigo ver a meta {stringInDoubleQuotes} na lista de metas', async (nome) => {
        var metas : ElementArrayFinder = element.all(by.name('inputmeta'));
        var iguais = metas.filter(elem => mesmaMeta(elem,nome));
        await assertTamanhoEqual(iguais,1);
    });

    When(/^Eu tento mudar o nome da meta "([^\"]*)" para "([^\"]*)"$/, async (nomeAntiga, nomeNova) => {
        var metas : ElementArrayFinder = element.all(by.name('inputmeta'));
        var metaAntiga = metas.filter(elem => mesmaMeta(elem, nomeAntiga));
        await metaAntiga.clear();
        await metaAntiga.sendKeys(<string> nomeNova);
    });

    Then('Eu nao consigo ver a meta {stringInDoubleQuotes} na lista de metas', async (nome) => {
        var metas : ElementArrayFinder = element.all(by.name('inputmeta'));
        var iguais = metas.filter(elem => mesmaMeta(elem,nome));
        await assertTamanhoEqual(iguais,0);
    });

    When(/^Eu tento remover a meta "([^\"]*)"$/, async (nome) => {
        var metas : ElementArrayFinder = element.all(by.tagName('th'));
        var escolhido = metas.filter(elem => elem.element(by.name('inputmeta')).getAttribute('value').then(text => text === nome));
        var botao = escolhido.get(0).element(by.name('botaoremover'));
        await botao.click();
    });
})


