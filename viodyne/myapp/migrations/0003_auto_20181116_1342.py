# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-16 13:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.TextField(max_length=250),
        ),
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.TextField(max_length=250),
        ),
    ]
