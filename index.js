const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();


//const url = 'https://lmatani.github.io/project-break-dashboard/';
const url = 'https://carlosdiazgirol.github.io/dashboard/';

app.get('/', (req,res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            console.log(html);
            // capturar cada parte que necesitemos
            const pageTitle = $('title').text();

            const links = []; // para guardar los enlaces de la página
           
            $('a').each((index, element) =>{
                const link = $(element).attr('href');
                links.push(link);
            })
            console.log(links);

            const imgs = [];
            $('img').each((index, element) => {
                const img = $(element).attr('src');
                imgs.push(img);
            });
            console.log(imgs);

            res.send(`<h1>${pageTitle}</h1>
            <h2>Enlaces</h2>
            <ul>${links.map(link => `<li><a href="${url}${link}" target="blank">${link}</a></li>`).join('')}</ul>
            <h2>Imagenes</h2>
            <ul>${imgs.map(img => `<li><a href="${url}${img}" target="blank">${img}</a></li>`).join('')}</ul>
            `);
        }
    });
});

app.listen(3000, (req, res) => {
    console.log('Express está escuchando en http://localhost:3000');
});

