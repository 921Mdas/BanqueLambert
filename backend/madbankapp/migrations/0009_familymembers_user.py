# Generated by Django 4.0.1 on 2022-03-30 22:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('madbankapp', '0008_rename_familymember_parentallowance_fam_member'),
    ]

    operations = [
        migrations.AddField(
            model_name='familymembers',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]