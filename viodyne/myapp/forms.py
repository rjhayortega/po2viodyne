from django import forms

class AddProductForm(forms.Form):
   name = forms.CharField(max_length = 100)
   description = forms.CharField()
