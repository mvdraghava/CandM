# Generated by Django 2.2.5 on 2019-12-09 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('createbid', '0019_ltegeneralconditions'),
    ]

    operations = [
        migrations.AddField(
            model_name='ltegeneralconditions',
            name='contractperiodText',
            field=models.CharField(default=' ', max_length=50000),
        ),
    ]