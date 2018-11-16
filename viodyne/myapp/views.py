# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from myapp.models import Dreamreal
from myapp.models import Product
from django.http import HttpResponse
from myapp.forms import AddProductForm


# Create your views here.
def hello(request):
     return render(request, "/home/vprivado/django/viodyne/myapp/template/Viodyne.html", {})


def join(request):
     return render(request, "/home/vprivado/django/viodyne/myapp/template/join.html", {})

     
def contact(request):
     return render(request, "/home/vprivado/django/viodyne/myapp/template/contact.html", {})





def article(request,id):
	 co = "fade"
	 qms = "fade"
	 om = "fade"
	 ov = "fade"
	 t = "fade"


	 if id=="1":
	 	co  = "fade in active"
	 if id=="2":
	 	qms = "fade in active"
	 if id=="3":
	 	om = "fade in active"
	 	
	 if id=="4":
	 	ov = "fade in active"
	 if id=="5":
	 	t = "fade in active"


	 return render(request, "/home/vprivado/django/viodyne/myapp/template/article1.html", 
     {"co":co,"qms":qms,"om":om,"ov":ov,"t":t})





def products(request):
	objects = Dreamreal.objects.all()
	return render(request, "/home/vprivado/django/viodyne/myapp/template/products.html", {"asd":objects})

def product(request,id):
	objects = Dreamreal.objects.all()
	return render(request, "/home/vprivado/django/viodyne/myapp/template/product.html", {"asd":objects})

def unsubscribe(request):
	objects = Dreamreal.objects.all()
	return render(request, "/home/vprivado/django/viodyne/myapp/template/unsubscribe.html", {"asd":objects})


def addform(request):

  return render(request, "/home/vprivado/django/viodyne/myapp/template/addform.html", {})




def addproduct(request):
  if request.method == "POST":
      #Get the posted form
      MyLoginForm = AddProductForm(request.POST)
      
      if MyLoginForm.is_valid():
         name = MyLoginForm.cleaned_data['name']
         pro =Product(name = name, image = "002376970",description="ASDASDASD")
         pro.save()
         res = "Added"

  return HttpResponse(res)


def getproducts(request):
  objects = Product.objects.all()
  return render(request, "/home/vprivado/django/viodyne/myapp/template/getproducts.html", {"products":objects})

     



def crudops(request):
   #Creating an entry
   
   dreamreal = Dreamreal(
      website = "www.polo.com", mail = "sorex@polo.com", 
      name = "sorex", phonenumber = "002376970"
   )
   
   dreamreal.save()
   
   #Read ALL entries
   objects = Dreamreal.objects.all()
   res ='Printing all Dreamreal entries in the DB : <br>'
   
   for elt in objects:
      res += elt.name+"<br>"
   
   #Read a specific entry:
   sorex = Dreamreal.objects.get(name = "sorex")
   res += 'Printing One entry <br>'
   res += sorex.name
   
   #Delete an entry
   res += '<br> Deleting an entry <br>'
   sorex.delete()
   
   #Update
   dreamreal = Dreamreal(
      website = "www.polo.com", mail = "sorex@polo.com", 
      name = "sorex", phonenumber = "002376970"
   )
   
   dreamreal.save()
   res += 'Updating entry<br>'
   
   dreamreal = Dreamreal.objects.get(name = 'sorex')
   dreamreal.name = 'thierry'
   dreamreal.save()
   
   return HttpResponse(res)
