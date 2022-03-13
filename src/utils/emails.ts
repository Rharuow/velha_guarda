import mjml2html from "mjml";

export const htmlSignup = (data: {
  name: string;
  token: string;
  email: string;
}) =>
  mjml2html(`
    <mjml>
    <mj-head>
    <mj-style>
      .header div {
        display: flex !important;
        color: #082c6c !important;
        justify-content: center;
        font-size: 24px !important;
      }

      .info div {
        color: #082c6c !important;
        font-size: 16px !important;
      }

      .code div {
        background-color: #eddd30;
        padding: 10px;
        display: flex !important;
        justify-content: center;
        border-radius: 10px;
      }

      .danger div {
        display: inline-block !important;
        width: 100% !important;
        color: red !important;
        font-size: 16px !important;
        font-weight: bold !important;
        text-align: center !important;
      }


      .char div, a {
        background-color: #082c6c;
        padding: 10px;
        display: flex !important;
        justify-content: center;
        border-radius: 50px;
        font-size: 18px !important;
        font-weight: bolder;
        color: #fff !important;
      }
    </mj-style>
      <mj-attributes>
        <mj-all font-family="Arial" />
        <mj-include path="./style.css" type="css" />
      </mj-attributes>
    </mj-head>
      <mj-body background-color="#9fc7cc">

        <mj-section>
          <mj-column>
            <mj-text css-class="header">Bem vindo ao Velha Guarda</mj-text>
          </mj-column>
        </mj-section>

      <mj-section>
        <mj-column>
          <mj-text css-class="info">${data.name}, tudo bem?</mj-text>
          <mj-text css-class="info">Falta pouco para concluir teu cadastro. Precisamos saber qual seu principal char no tibia.</mj-text>
          <mj-text css-class="info">
            Coloque o código abaixo no comentário do char que você escolheu para que possamos adicionar na nossa plataforma.
          </mj-text>
          <mj-text css-class="danger">
            Não é necessário apagar o comentário do seu char, só coloque o código em qualquer lugar que nós identificaremos.
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section>
        <mj-column css-class="code">
          <mj-text>
            ${data.token}
          </mj-text>
        </mj-column>
      </mj-section>


      <mj-section>
        <mj-column css-class="char">
          <mj-text>
            <a target="_blank" href="${process.env.WEB_URL}/confirmation?email=${data.email}&token=${data.token}">Clique aqui para cadastrar um char!</a>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`);
