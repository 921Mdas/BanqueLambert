# Generated by Django 4.0.1 on 2022-03-30 18:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('madbankapp', '0006_constructionproject_cost'),
    ]

    operations = [
        migrations.RenameField(
            model_name='parentallowance',
            old_name='contribution',
            new_name='allowance',
        ),
        migrations.RenameField(
            model_name='parentallowance',
            old_name='familymembers',
            new_name='familymember',
        ),
    ]