# Generated by Django 2.2.5 on 2020-03-13 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('createbid', '0039_spotquotationcommittee'),
    ]

    operations = [
        migrations.CreateModel(
            name='TenderStages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bid_type', models.CharField(max_length=15)),
                ('stage_number', models.IntegerField()),
                ('stage', models.CharField(max_length=20)),
            ],
        ),
    ]
