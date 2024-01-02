document.getElementById('toggleGenresBtn').addEventListener('click', function () {
  const genresSection = document.getElementById('genresSection');
  const arrowIcon = document.getElementById('arrowIcon');

  if (genresSection.style.display === 'none') {
      genresSection.style.display = 'block';
      genresSection.style.height = 'auto';
      arrowIcon.style.transform = 'rotate(90deg)';
  } else {
      genresSection.style.display = 'none';
      genresSection.style.height = '0';
      arrowIcon.style.transform = 'rotate(0deg)';
  }
});
document.getElementById('toggleLanguageBtn').addEventListener('click', function () {
const genresSection = document.getElementById('languageSection');
const arrowIcon = document.getElementById('arrowIcon');

if (genresSection.style.display === 'none') {
    genresSection.style.display = 'block';
    genresSection.style.height = 'auto';
    arrowIcon.style.transform = 'rotate(90deg)';
} else {
    genresSection.style.display = 'none';
    genresSection.style.height = '0';
    arrowIcon.style.transform = 'rotate(0deg)';
}
});
document.getElementById('toggleDecadeBtn').addEventListener('click', function () {
const genresSection = document.getElementById('decadeSection');
const arrowIcon = document.getElementById('arrowIcon');

if (genresSection.style.display === 'none') {
  genresSection.style.display = 'block';
  genresSection.style.height = 'auto';
  arrowIcon.style.transform = 'rotate(90deg)';
} else {
  genresSection.style.display = 'none';
  genresSection.style.height = '0';
  arrowIcon.style.transform = 'rotate(0deg)';
}
});

document.getElementById('menuButton').addEventListener('click', function () {
  var menuContent = document.getElementById('menuContent');
  menuContent.classList.toggle('visible');
});
function myFunction(x) {
x.classList.toggle("change");
}