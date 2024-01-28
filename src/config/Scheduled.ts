import CronJob from 'node-cron';
import https from 'https';
import axios from 'axios';
//@ts-ignore
import httpntlm from 'httpntlm';
import util from 'util';
import { parse } from 'node-html-parser';
import fs from 'node:fs';




export class ScheduledJob {
    scheduledJobFunction: CronJob.ScheduledTask;

    // marcarAsistencia() :void{
    //     this.scheduledJobFunction = CronJob.schedule('7 4,19 * * *', () => {
    //         console.info(getHora() + " Lanzamiento de socket");
    //     });
    // }

    // start():void{
    //     this.scheduledJobFunction.start()
    // }

    constructor() {
        this.test2().then(res => {
            console.log("ejecucion terimnada!")
        });
        // this.marcarAsistencia();
        // this.scheduledJobFunction.start();
    }


    async test(): Promise<void> {

        console.log("test init");
        const agent = new https.Agent({
            keepAlive: true,
            maxSockets: 100,
            maxFreeSockets: 10,
            // freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
        });
        const url = 'https://applocales.bg.com.bo/Asistencia/';
        const options = {
            method: 'GET',
            url,
            httpsAgent: agent,
            headers: {
                'Authorization': 'NTLM ' + Buffer.from('javier.canqui:BgGnd47596**').toString('base64'),
                "Accept": "text/html"
            }
        };

        try {
            const response = await axios(options);
            console.log(response.data);
            console.log("options", options);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    async test2(): Promise<void> {
        console.log("test init");
        const httpntlmGet = util.promisify(httpntlm.get);
        const httpntlmPost = util.promisify(httpntlm.post);

        let options = {
            url: 'https://applocales.bg.com.bo/Asistencia/',
            username: 'javier.canqui',
            password: 'BgGnd47596**',
            workstation: '',
            domain: '',
            body: '{}'
        };

        try {
            const response = await httpntlmGet(options);
            const body = response.body;

            // const body = fs.readFileSync('./assets/asistencia.html', 'utf8');
            // console.log("body",body);

            const root = parse(body);
            // console.log("dom", dom);
            // const input = root.querySelector('#__VIEWSTATE');

            // const param1 = root.querySelector('#__VIEWSTATE')?.attributes?.value;

            const params = {
                "__EVENTTARGET": "",
                "__EVENTARGUMENT": "",
                "__LASTFOCUS": "",
                "__VIEWSTATE": root.querySelector('#__VIEWSTATE')?.attributes?.value,
                "__VIEWSTATEGENERATOR": root.querySelector('#__VIEWSTATEGENERATOR')?.attributes?.value,
                "__EVENTVALIDATION": root.querySelector('#__EVENTVALIDATION')?.attributes?.value,
                "ctl00$ContentPlaceHolder1$hdnUsuarioAD": "javier.canqui",
                "ctl00$ContentPlaceHolder1$hdnArea": "Tecnología+de+la+Información",
                "ctl00$ContentPlaceHolder1$hdnCargo": "Desarrollador+de+Software",
                "ctl00$ContentPlaceHolder1$hdnSucursal": "La+Paz",
                "ctl00$ContentPlaceHolder1$hdnNombreCompleto": "Javier+Canqui+Llusco",
                "ctl00$ContentPlaceHolder1$hdnEstaAtrasado": root.querySelector('#ContentPlaceHolder1_hdnEstaAtrasado')?.attributes?.value,
                // "ctl00$ContentPlaceHolder1$dgrvMarcaciones$DXSelInput":root.querySelector('#ContentPlaceHolder1_dgrvMarcaciones_DXSelInput')?.attributes?.value,
                "ctl00$ContentPlaceHolder1$dgrvMarcaciones$DXSelInput": "",
                "ctl00$ContentPlaceHolder1$dgrvMarcaciones$DXKVInput": "[]",
                "ctl00$ContentPlaceHolder1$dgrvMarcaciones$CallbackState": root.querySelector('#ContentPlaceHolder1_dgrvMarcaciones_CallbackState')?.attributes?.value,
                "ctl00$ContentPlaceHolder1$drblTipo": "R",
                "ctl00$ContentPlaceHolder1$dbtnProcesar": [
                    "MARCAR",
                    ""
                ],
                // "ctl00$ContentPlaceHolder1$dtxtMotivo":root.querySelector('#ContentPlaceHolder1_dtxtMotivo_I')?.attributes?.value,
                "ctl00$ContentPlaceHolder1$dtxtMotivo": "nosecomoexplicarestemotivo",
                "ctl00$ContentPlaceHolder1$dtxtMotivo$CVS": "",
                "ContentPlaceHolder1_dpopMensajeWS": root.querySelector('#ContentPlaceHolder1_dpopMensajeWS')?.attributes?.value,
                "DXScript": "1_171,1_94,1_164,1_104,1_138,1_114,1_121,1_105,1_91,1_156,1_154",
                "DXCss": "1_12,1_5,App_Themes/BG_Skin/Editors/styles.css,App_Themes/BG_Skin/GridView/sprite.css,App_Themes/BG_Skin/Web/sprite.css,App_Themes/BG_Skin/GridView/styles.css,App_Themes/BG_Skin/Web/styles.css,App_Themes/BG_Skin/Editors/sprite.css,App_Themes/BG_Skin/Chart/styles.css,App_Themes/BG_Skin/Editors/Sprite.css,App_Themes/BG_Skin/HtmlEditor/sprite.css,App_Themes/BG_Skin/HtmlEditor/styles.css,App_Themes/BG_Skin/PivotGrid/Sprite.css,App_Themes/BG_Skin/PivotGrid/styles.css,App_Themes/BG_Skin/Scheduler/Sprite.css,App_Themes/BG_Skin/Scheduler/styles.css,App_Themes/BG_Skin/SpellChecker/styles.css,App_Themes/BG_Skin/Spreadsheet/sprite.css,App_Themes/BG_Skin/Spreadsheet/styles.css,App_Themes/BG_Skin/TreeList/Sprite.css,App_Themes/BG_Skin/TreeList/styles.css,App_Themes/BG_Skin/Web/DocumentViewerSprite.css,App_Themes/BG_Skin/Web/HESprite.css,App_Themes/BG_Skin/Web/Sprite.css,App_Themes/BG_Skin/Web/SSSprite.css,App_Themes/BG_Skin/XtraReports/Sprite.css,App_Themes/BG_Skin/XtraReports/styles.css"
            };

            // const queryString = Object.entries(params)
            // .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            // .join('&');
        //   console.log(queryString); 

            //envio asistencia
            options = {
                ...options,
                // body: JSON.stringify(params)
                body: "__EVENTTARGET=&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKMTc4Nzc5ODQwMQ9kFgJmD2QWAgIDD2QWAgIDD2QWEgIPDzwrAAQBAA8WAh4FVmFsdWUFFEphdmllciBDYW5xdWkgTGx1c2NvZGQCEQ88KwAEAQAPFgIfAAUXfi9JbWcvUGhvdG8vTm9Gb3RvLmpwZWdkZAIVDzwrABwDAA8WAh4PRGF0YVNvdXJjZUJvdW5kZ2QGD2QQFgVmAgECAgIDAgQWBTwrAAoBABYIHg9Db2xWaXNpYmxlSW5kZXhmHglTb3J0SW5kZXgC%2F%2F%2F%2F%2Fw8eCkdyb3VwSW5kZXgC%2F%2F%2F%2F%2Fw8eCVNvcnRPcmRlcgspekRldkV4cHJlc3MuRGF0YS5Db2x1bW5Tb3J0T3JkZXIsIERldkV4cHJlc3MuRGF0YS52MTQuMSwgVmVyc2lvbj0xNC4xLjguMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1iODhkMTc1NGQ3MDBlNDlhADwrAAoBABYIHwICAR8DAv%2F%2F%2F%2F8PHwQC%2F%2F%2F%2F%2Fw8fBQsrBAA8KwAKAQAWCB8CAgIfAwL%2F%2F%2F%2F%2FDx8EAv%2F%2F%2F%2F8PHwULKwQAPCsACgEAFggfAgIDHwMC%2F%2F%2F%2F%2Fw8fBAL%2F%2F%2F%2F%2FDx8FCysEADwrAAoBABYIHwICBB8DAv%2F%2F%2F%2F8PHwQC%2F%2F%2F%2F%2Fw8fBQsrBAAPFgUCAQIBAgECAQIBFgEFiAFEZXZFeHByZXNzLldlYi5BU1B4R3JpZFZpZXcuR3JpZFZpZXdEYXRhQ29sdW1uLCBEZXZFeHByZXNzLldlYi52MTQuMSwgVmVyc2lvbj0xNC4xLjguMCwgQ3VsdHVyZT1uZXV0cmFsLCBQdWJsaWNLZXlUb2tlbj1iODhkMTc1NGQ3MDBlNDlhGDwrAAYBBRQrAAJkZGQCGQ88KwAEAQAPFgIfAAUZRGVzYXJyb2xsYWRvciBkZSBTb2Z0d2FyZWRkAh0PPCsABAEADxYCHwAFHlRlY25vbG9nw61hIGRlIGxhIEluZm9ybWFjacOzbmRkAiEPPCsABAEADxYCHwAFBkxhIFBhemRkAiMPEGRkFgECAWQCJw8WAh4HVmlzaWJsZWgWAgIDDxQrAAUPFgQfAGUeB0VuYWJsZWRoZDwrAAwBABYEHglCYWNrQ29sb3IKEx4EXyFTQgIIZGRkZAIpDzwrAAgCATwrAAwBABYGHgVXaWR0aBsAAAAAAAB0QAEAAAAeBkhlaWdodBsAAAAAAIBmQAEAAAAfCQKAAwY8KwASAQAWCB4OU2hvd09uUGFnZUxvYWRoHgZQaW5uZWRoHglDb2xsYXBzZWRoHglNYXhpbWl6ZWRoZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAwUpY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRkZ3J2TWFyY2FjaW9uZXMFJmN0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkZGJ0blByb2Nlc2FyBSVjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJGRwb3BNZW5zYWplveDBA2XlsPDYA4l4It6JpuMULov8dCY2OGnzd1DjWvo%3D&__VIEWSTATEGENERATOR=DA77CE1E&__EVENTVALIDATION=%2FwEdAA5JBQ%2F%2Fzxbd5xOSm9QJgnb6WUAmyio9nJN6h%2FfDXXpv6hKy322B%2FqAKQuLYFoX%2FnR8VR4cNqlGnk3SkImFFmIgqo9cF7WSE1bpnB1oUIBa%2BdVKqGpUaEEY9VOssfcLV5iADtrlsXP21%2FNNpyJdKjhz77p%2FHB7mgUrDBtf7uBCWWIvx4BPNnicrIvX3uijCm0hjfu7sdabK6e5AGS1JHoyfyJXnJrtHRunUEc1zXWaEhUhZXiw7hsStegPYCzSK1OH4dg9x0LYYFqhrqy4mxphTAbvrakrXGmofqF9XGS7iYVwugTeBpMqS%2FufQpzKR4kFn%2Finc%2BtkOefyDKnHHLZADi&ctl00%24ContentPlaceHolder1%24hdnUsuarioAD=javier.canqui&ctl00%24ContentPlaceHolder1%24hdnArea=Tecnolog%C3%ADa+de+la+Informaci%C3%B3n&ctl00%24ContentPlaceHolder1%24hdnCargo=Desarrollador+de+Software&ctl00%24ContentPlaceHolder1%24hdnSucursal=La+Paz&ctl00%24ContentPlaceHolder1%24hdnNombreCompleto=Javier+Canqui+Llusco&ctl00%24ContentPlaceHolder1%24hdnEstaAtrasado=No&ctl00%24ContentPlaceHolder1%24dgrvMarcaciones%24DXSelInput=&ctl00%24ContentPlaceHolder1%24dgrvMarcaciones%24DXKVInput=%5B%5D&ctl00%24ContentPlaceHolder1%24dgrvMarcaciones%24CallbackState=BwMHAgIERGF0YQahAQAAAAAFAAAABQAAAAAAAAAFAAAAAAUAAAADRElBA0RJQQcAAAVGRUNIQQVGRUNIQQcAAARIT1JBBEhPUkEHAAAEVElQTwRUSVBPBwAADk1PVElWT19SRVRSQVNPDk1PVElWT19SRVRSQVNPBwAAAAAAAAcABwAHAAcABv%2F%2FBwIJTWFydGVzICAgBwIKMDkvMDEvMjAyNAcCCDA3OjU5OjIwBwIHRU5UUkFEQQwHAAcABv%2F%2FBwIKTWnDqXJjb2xlcwcCCjEwLzAxLzIwMjQHAggwNzo1NjozNwcCB0VOVFJBREEMBwAHAAb%2F%2FwcCCUp1ZXZlcyAgIAcCCjExLzAxLzIwMjQHAggwODowNTo1NQcCB0VOVFJBREEHAhFFc3RhIGxlbnRvIGxhIHZwbgcABwAG%2F%2F8HAglWaWVybmVzICAHAgoxMi8wMS8yMDI0BwIIMDc6NTA6NDEHAgdFTlRSQURBDAcABwAG%2F%2F8HAglMdW5lcyAgICAHAgoxNS8wMS8yMDI0BwIIMDg6MDE6NDkHAgdFTlRSQURBBwIHc2luIHZwbgIFU3RhdGUHRAcFBwACAQcBAgEHAgIBBwMCAQcEAgEHAAcABwAHAAIABQAAAIAJAgAHAAkCAAIAAwcEAgAHAAIBBwUHAAIBBwAHAAcAAghQYWdlU2l6ZQMHBw%3D%3D&ctl00%24ContentPlaceHolder1%24drblTipo=F&ctl00%24ContentPlaceHolder1%24dbtnProcesar=MARCAR&ContentPlaceHolder1_dpopMensajeWS=0%3A0%3A-1%3A-10000%3A-10000%3A0%3A320%3A180%3A1%3A0%3A0%3A0&DXScript=1_171%2C1_94%2C1_164%2C1_104%2C1_138%2C1_114%2C1_121%2C1_105%2C1_91%2C1_156%2C1_154&DXCss=1_12%2C1_5%2CApp_Themes%2FBG_Skin%2FEditors%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FGridView%2Fsprite.css%2CApp_Themes%2FBG_Skin%2FWeb%2Fsprite.css%2CApp_Themes%2FBG_Skin%2FGridView%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FWeb%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FEditors%2Fsprite.css%2CApp_Themes%2FBG_Skin%2FChart%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FEditors%2FSprite.css%2CApp_Themes%2FBG_Skin%2FHtmlEditor%2Fsprite.css%2CApp_Themes%2FBG_Skin%2FHtmlEditor%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FPivotGrid%2FSprite.css%2CApp_Themes%2FBG_Skin%2FPivotGrid%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FScheduler%2FSprite.css%2CApp_Themes%2FBG_Skin%2FScheduler%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FSpellChecker%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FSpreadsheet%2Fsprite.css%2CApp_Themes%2FBG_Skin%2FSpreadsheet%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FTreeList%2FSprite.css%2CApp_Themes%2FBG_Skin%2FTreeList%2Fstyles.css%2CApp_Themes%2FBG_Skin%2FWeb%2FDocumentViewerSprite.css%2CApp_Themes%2FBG_Skin%2FWeb%2FHESprite.css%2CApp_Themes%2FBG_Skin%2FWeb%2FSprite.css%2CApp_Themes%2FBG_Skin%2FWeb%2FSSSprite.css%2CApp_Themes%2FBG_Skin%2FXtraReports%2FSprite.css%2CApp_Themes%2FBG_Skin%2FXtraReports%2Fstyles.css&ctl00%24ContentPlaceHolder1%24dbtnProcesar="
            }
            console.log("#datos", JSON.stringify(params));
            const responsePost = await httpntlmPost(options);
            const bodyPost = responsePost.body;
            // console.log("bodyPost", bodyPost);

            await this.createTxtFile(bodyPost.toString());
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async createTxtFile(data: string): Promise<void> {

        const writeFile = util.promisify(fs.writeFile);
        // const data = 'Hola, mundo!'; // Contenido del archivo
        const filePath = `./assets/res-${this.getHora()}.html`; // Ruta del archivo

        try {
            await writeFile(filePath, data);
            console.log('Archivo creado exitosamente.');
        } catch (error) {
            console.error(`Hubo un error al crear el archivo: ${error}`);
        }
    }

    getHora = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return dd + '-' + mm + '-' + yyyy + ' ' + today.getHours() + '.' + today.getMinutes() + '.' + today.getSeconds();
    }

    convertirBody():string{
        let res="";
        const obj = {
            clave1: 'valor1',
            clave2: 'valor2'
          };
          
          const queryString = Object.entries(obj)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
          
          console.log(queryString); // Imprime: clave1=valor1&clave2=valor2
          

        return res;
    }
}