# Generated by Django 4.0.1 on 2022-03-30 02:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('madbankapp', '0004_alter_familymembers_options'),
    ]

    operations = [
        migrations.RenameField(
            model_name='parentallowance',
            old_name='person',
            new_name='familymembers',
        ),
    ]