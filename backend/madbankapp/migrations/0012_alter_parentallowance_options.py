# Generated by Django 4.0.1 on 2022-04-08 12:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('madbankapp', '0011_alter_parentallowance_timestamp'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='parentallowance',
            options={'ordering': ['-fam_member']},
        ),
    ]
