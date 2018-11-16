# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Dreamreal(models.Model):

   website = models.CharField(max_length = 50)
   mail = models.CharField(max_length = 50)
   name = models.CharField(max_length = 50)
   phonenumber = models.IntegerField()

   class Meta:
      db_table = "dreamreal"


class Product(models.Model):

   name = models.CharField(max_length = 250)
   image = models.TextField(max_length = 250)
   description = models.TextField(max_length = 250)

   class Meta:
      db_table = "product"