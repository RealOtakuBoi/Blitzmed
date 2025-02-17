function showEmergencyPage() {
    document.querySelector('.plus-sign').style.display = 'none';
    document.querySelector('p').style.display = 'none';
    document.getElementById('emergencyPage').classList.remove('hidden');
}
function goBack() {
    document.getElementById('emergencyPage').classList.add('hidden');
    document.querySelector('.plus-sign').style.display = 'block';
    document.querySelector('p').style.display = 'block';
}