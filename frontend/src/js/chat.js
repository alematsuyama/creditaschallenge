$(document).ready(function(){
  var messages = [];
  var messagecounter = 0;
  var messageaux = 0;
  var messageelement;

  //long polling, a cada 1s atualiza mensagens que nao foram mostradas
  (function poll(){
     setTimeout(function(){
       if(messagecounter != messageaux){
         messageaux = messagecounter;
         messageelement.append(messages[messagecounter - 1]);
       }
      poll();
    }, 1000);
  })();

  //click event ao enviar a mensagem, esta e salva numa variavel comum
  $(document).delegate('.message-button', 'click',function(){
    if($(this).parent().children('.message-text').val() != ''){
      dt = new Date();
      time = dt.getHours() + ":" + dt.getMinutes();
      messages.push('<li>'+'('+ time +') ' + $(this).parent().children('.message-text').val() + '</li>');
      messagecounter ++;
      messageelement = $(this).parent().parent().children('.message-list');
      $(this).parent().children('.message-text').val('');
    }
  });

  $('.new-chat').on('click',function(){
    $('body').append('<div class="chat" > <h1>Chat</h1><div class="messages"><ul class="message-list"> </ul><div class="message-input"><input type="text" class="message-text"/><button class="message-button">Enviar</button></div></div></div>');
  });

});
