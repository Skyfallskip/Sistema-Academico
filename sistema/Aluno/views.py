from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, "Pagina_Inicial_Aluno.html")

def perfil(request):
    return render(request, "Perfil_Aluno.html")

def turma(request):
    return render(request, "Turma_Aluno.html")

def notas(request):
    return render(request, "Notas_Aluno.html")

def avisos(request):
    return render(request, "Avisos_Aluno.html")