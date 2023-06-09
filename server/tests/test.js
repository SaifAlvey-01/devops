const { By, Key, Builder, until, Select } = require('selenium-webdriver');
const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../models/users');
const config = require('config');
const db = "mongodb+srv://stdncms:Sraj.786!@cluster0.tykmzrf.mongodb.net/?retryWrites=true&w=majority";
const baseURL = "http://43.206.3.88:83/";

const emailAddress = 'test@gmail.com';
const password = 'test123456';

// Test case for Register functionality

describe('Register', function () {
  let driver;
  this.timeout(60000);
  before(async function () {
    try {
      driver = await new Builder()
      .usingServer('http://selenium-hub:4444/') 
      .forBrowser('chrome')
      .build();	

    } catch (error) {
      console.error('An error occurred:', error);
    }
  });

  after(async function () {
    try {
     

      await driver.quit();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });

  it('Register', async function () {
    await driver.get(`${baseURL}/`);
    console.log(`${baseURL}/`);
    await driver.findElement(By.xpath('//*[@id="root"]/div/nav/div[1]/div[4]/div[2]/svg')).click();
    await driver.findElement(By.xpath('//*[@id="root"]/div/section[1]/div/div[3]')).click();
    await driver.findElement(By.id('name')).sendKeys('Test User');
    await driver.findElement(By.id('email')).sendKeys(emailAddress);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('cpassword')).sendKeys(password);

    await driver
      .findElement(By.xpath('//*[@id="root"]/div/section[1]/div/form/div[6]'))
      .click();
    
    await driver
      .findElement(By.xpath('//*[@id="root"]/div/section[1]/div/div[3]'))
      .click();
    
  });

  it('Login', async function () {
    await driver.get(`${baseURL}/`);
    await driver.findElement(By.xpath('//*[@id="root"]/div/nav/div[1]/div[4]/div[2]/svg')).click();
    await driver.findElement(By.id('name')).sendKeys(emailAddress);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver
      .findElement(By.xpath('//*[@id="root"]/section/form/input'))
      .click();
    });

    it('Create Profile', async function () {
      await driver.get(`${baseURL}/create-profile`);
      const selectElement = driver.findElement(By.name('status'));
      const select = new Select(selectElement);
      select.selectByValue('Developer');  
      await driver.findElement(By.name('company')).sendKeys('Test Company');
      await driver.findElement(By.name('website')).sendKeys('http://google.com/');
      await driver
        .findElement(By.name('location'))
        .sendKeys('Islamabad, Pakistan');
      await driver
        .findElement(By.name('skills'))
        .sendKeys('JS,NODE,REACT, HTML, CSS');
      await driver.findElement(By.name('githubusername')).sendKeys('google');  
      await driver
        .findElement(By.xpath('//*[@id="root"]/section/form/input'))
        .click();
      await driver.sleep(1000);
  
      let txt = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/section/div[1]/a[1]')),
        4000
      );
      txt = await txt.getText();
      assert.strictEqual(txt, 'Edit Profile');
    });
  
    it('Update Profile', async function () {
      await driver.get(`${baseURL}/update-profile`);
      const selectElement = driver.findElement(By.name('status'));
      const select = new Select(selectElement);
      select.selectByValue('Developer');  
      await driver.findElement(By.name('company')).sendKeys('Test Company');
      await driver.findElement(By.name('website')).sendKeys('http://google.com/');
      await driver
        .findElement(By.name('location'))
        .sendKeys('Islamabad, Pakistan');
      await driver
        .findElement(By.name('skills'))
        .sendKeys('JS,NODE,REACT, HTML, CSS');
      await driver.findElement(By.name('githubusername')).sendKeys('google');  
      await driver
        .findElement(By.xpath('//*[@id="root"]/section/form/input'))
        .click();
      await driver.sleep(1000);
  
      let txt = await driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/section/div[1]/a[1]')),
        4000
      );
      txt = await txt.getText();
      assert.strictEqual(txt, 'Update Profile');
    });
  
    it('Delete Profile', async function () {
      await driver.get(`${baseURL}/dashboard`);
      await driver.sleep(1000);
      await driver
        .findElement(By.xpath('/html/body/div/section/div[2]/button'))
        .click();
  
    });  
});

