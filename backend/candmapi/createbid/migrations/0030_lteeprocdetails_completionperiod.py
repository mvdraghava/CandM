# Generated by Django 2.2.5 on 2020-01-17 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('createbid', '0029_lteeprocnitdetails'),
    ]

    operations = [
        migrations.AddField(
            model_name='lteeprocdetails',
            name='completionperiod',
            field=models.CharField(default='30 Days', max_length=150),
        ),
    ]
