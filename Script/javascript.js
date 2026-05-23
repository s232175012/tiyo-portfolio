$(document).ready(function() {

  // 1. Smooth scroll with sticky header offset
  $('a[href^="#"]').on('click', function(e) {
    const href = $(this).attr('href');
    
    // Ignore empty links
    if (href === '#' || href === '') return;
    
    const target = $(href);
    if (!target.length) return;
    
    e.preventDefault();
    
    const headerHeight = $('.header').outerHeight() || 0;
    const targetPosition = target.offset().top - headerHeight - 10;
    
    $('html, body').animate({
      scrollTop: targetPosition
    }, 600, 'swing');
  });

  // 2. Fade in sections on scroll
  function checkFadeIn() {
    const windowBottom = $(window).scrollTop() + $(window).height();
    
    $('section').each(function() {
      const sectionTop = $(this).offset().top;
      
      // If section is 100px into viewport and not visible yet
      if (sectionTop < windowBottom - 100 && !$(this).hasClass('visible')) {
        $(this).addClass('visible');
      }
    });
  }
  
  // Run on scroll and on page load
  $(window).on('scroll', checkFadeIn);
  checkFadeIn();

  // 3. Contact form handler
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    
    const $form = $(this);
    const $statusMsg = $('#formStatus');
    
    const name = $.trim($form.find('[name="name"]').val());
    const email = $.trim($form.find('[name="email"]').val());
    const message = $.trim($form.find('[name="message"]').val());
    
    // Basic validation
    if (!name || !email || !message) {
      showStatus('Please fill out all fields', 'error');
      return;
    }
    
    showStatus('Opening email client...', 'sending');
    
    setTimeout(function() {
      const subject = encodeURIComponent('Message from ' + name);
      const body = encodeURIComponent(message + '\n\nFrom: ' + email);
      const mailtoLink = 'mailto:s232175012@mandela.ac.za?subject=' + subject + '&body=' + body;
      
      window.location.href = mailtoLink;
      
      showStatus('Message ready! Check your email client.', 'success');
      $form[0].reset();
      
      setTimeout(function() {
        showStatus('', '');
      }, 4000);
    }, 600);
    
    
    function showStatus(message, type) {
      $statusMsg.text(message).removeClass('success error sending').addClass(type);
    }
  });

  // 4. WhatsApp/Call click tracking
  $('.contact-link').on('click', function() {
    let type = 'Email';
    if ($(this).hasClass('whatsapp')) type = 'WhatsApp';
    if ($(this).hasClass('call')) type = 'Call';
    
    console.log('Clicked:', type);
  });

});

$(document).ready(function() {
  // For mobile tap
  $('.skill-badge').on('click', function(e) {
    e.preventDefault();
    $('.skill-badge').removeClass('active'); // close others
    $(this).toggleClass('active');
  });
  
  // Close when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.skill-badge').length) {
      $('.skill-badge').removeClass('active');
    }
  });
});